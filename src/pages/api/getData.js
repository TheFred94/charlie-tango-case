export default async function handler(req, res) {
  // This here code is used to generate a response when setting up the Supabase database. This is to make sure that the database responds with the correct information before trying to send data.
  //* This help with debugging.
  //!   res.status(200).json({ name: req.body });

  // Gets the data from the Supabase database and displays it in the dashboard
  const response = await fetch(
    "https://hgumkzlqjshouqhpskwd.supabase.co/rest/v1/Dashboard_data",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_KEY,
        Prefer: "return=representation",
      },
    }
  ).then((res) => res.json());
  console.log({ response });

  res.status(200).json({ response });
}
