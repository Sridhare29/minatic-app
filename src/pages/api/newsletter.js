
// Dummy keys <- no longer work
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { email } = req.body;
    console.log({ email });  

    // TODO: put in .env
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
    
      try {
        const AUDIENCE_ID = ""
        const API_KEY = "";
        const DATACENTER = ""
        const data = {
          email_address: email,
          status: 'subscribed',
        };
    
        const response = await fetch(
          `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
    
          {
            body: JSON.stringify(data),
            headers: {
              Authorization: `apikey ${API_KEY}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
          }
        );

        console.log(response)
    
        if (response.status >= 400) {
          return res.status(400).json({
            error: `There was an error subscribing to the newsletter.
            Hit me up peter@peterlunch.com and I'll add you the old fashioned way :(.`,
          });
        }
        return res.status(201).json({ error: '' });
      } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() });
      }      
  };