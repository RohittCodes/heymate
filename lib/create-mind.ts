import MindsDB from "mindsdb-js-sdk";

const connect = async () => {
  try {
    await MindsDB.connect({
      user: "",
      password: "",
      host: process.env.MINDSDB_HOST!,
    });

    return console.log("Connected to MindsDB");
  } catch (error: any) {
    return error;
  }
};

export default connect;