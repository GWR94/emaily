const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice');
		_.chain(req.body)
			.map(({ email, url }) => {
				const match = p.test(new URL(url).pathname);
				if (match) {
					return { email, surveyId: match.surveyId, choice: match.choice };
				}
			})
			.compact()
			.uniqBy('email', 'surveyId')
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					//Look at survey collection and find & update the collection
					{
						_id: surveyId, //mongoDB needs the id to be '_id'
						recipients: {
							$elemMatch: {
								//find recipient with the responded value as false
								email: email,
								responded: false,
							},
						},
					},
					{
						//after survey is found, update it
						$inc: {
							[choice]: 1, //update the choice value by 1
						},
						$set: {
							'recipients.$.responded': true, //$ sets the original recipients id to the query
						},
					}
				).exec();
			})
			.value();
		res.send({});
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id, //ID created by mongoose
			dateSent: Date.now(),
		});

		try {
			const mailer = new Mailer(survey, surveyTemplate(survey));
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (e) {
			res.status(422).send(e);
		}
	});
};
