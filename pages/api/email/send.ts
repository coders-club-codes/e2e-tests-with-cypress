import sgEmail from '@sendgrid/mail';
sgEmail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handle(req, res) {
  const { email, subject, body } = req.body;

  const msg = {
    to: email,
    from: 'Coders Club <contato@codersclub.com.br',
    subject,
    text: body,
  };

  try {
    const mails = await sgEmail.send(msg);

    res.status(200).json(mails[0].body);
  } catch (err) {
    console.log(err);
    return res.status(500).json({});
  }
}
