export default async function handler(req, res) {
  // This here code is used to generate a response when setting up the Supabase database. This is to make sure that the database responds with the correct information before trying to send data.
  //* This help with debugging.
  //!   res.status(200).json({ name: req.body });

  // Patches the data in the Supabase database. When the boolean value of "contacted" changes, that value is also changed in the database
  const response = await fetch(
    `https://hgumkzlqjshouqhpskwd.supabase.co/rest/v1/Dashboard_data?id=eq.${req.body.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_KEY,
        Prefer: "return=representation",
      },
      body: JSON.stringify(req.body),
    }
  ).then((res) => res.json());
  console.log({ response });
  //   res.redirect(307, "/");
  res.status(200).json({ response });
}
