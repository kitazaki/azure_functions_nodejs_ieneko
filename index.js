const line = require('@line/bot-sdk');
const azure = require("azure-storage");
const queue = require("@azure/storage-queue");
const flexm = require("./flexmn.js");

const client = new line.Client({
    channelAccessToken: process.env.ACCESS_TOKEN  
});

const basecont = "https://nekobot3raspi8pic.blob.core.windows.net/nekoboto-pic-cont/";
let ownerName = "";
let selectkitty = "";
let piyo = "";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const tableService = new azure.TableService(connectionString);
if (typeof connectionString === "undefined") {
  console.error("AZURE_STORAGE_CONNECTION_STRING is not set");
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    console.log(req);

    if (req.query.message || (req.body && req.body.events)) {
        if (req.body && req.body.events[0]) {
            const movieUrl = basecont + ownerName;
            if (req.body.events[0].type === "postback") {
                if (req.body.events[0].postback.data === "othercats") {
                    await client.replyMessage(req.body.events[0].replyToken, {
                      type: "flex",
                      altText: "Flex Message",
                      contents: {
                        type: "carousel",
                        contents: [{
                            type: "bubble",
                            hero: {
                              type: "image",
                              url: "https://i.gyazo.com/5dfcb7278d273ae0610f8f0c6cd48b8c.jpg",
                              size: "full",
                              aspectRatio: "4:3",
                              aspectMode: "cover",
                              action: {
                                type: "postback",
                                label: "Tico",
                                text: "Ticoちゃんをみにいく",
                                data: "nekosan1",
                              },
                            },
                            body: {
                              type: "box",
                              layout: "vertical",
                              spacing: "sm",
                              contents: [{
                                type: "text",
                                text: "#Tico",
                                size: "xl",
                                align: "start",
                                weight: "bold",
                                color: "#5B5B5B",
                                wrap: true,
                              }, ],
                            },
                            footer: {
                              type: "box",
                              layout: "vertical",
                              spacing: "sm",
                              contents: [{
                                type: "text",
                                text: "Ticoちゃんをみにいく",
                                size: "lg",
                                align: "center",
                                weight: "regular",
                                action: {
                                  type: "postback",
                                  label: "Tico",
                                  text: "Ticoちゃんをみにいく",
                                  data: "nekosan1",
                                },
                              }, ],
                            },
                          },
                          {
                            type: "bubble",
                            hero: {
                              type: "image",
                              url: "https://i.gyazo.com/d1bacf7e3298b6f3b6d0b17abc48f044.jpg",
                              size: "full",
                              aspectRatio: "4:3",
                              aspectMode: "cover",
                              action: {
                                type: "postback",
                                label: "niiina",
                                text: "niiinaちゃんをみにいく",
                                data: "nekosan2",
                              },
                            },
                            body: {
                              type: "box",
                              layout: "vertical",
                              spacing: "sm",
                              contents: [{
                                type: "text",
                                text: "#niiina",
                                size: "xl",
                                align: "start",
                                weight: "bold",
                                color: "#5B5B5B",
                                wrap: true,
                              }, ],
                            },
                            footer: {
                              type: "box",
                              layout: "vertical",
                              spacing: "sm",
                              contents: [{
                                type: "text",
                                text: "niiinaちゃんをみにいく",
                                size: "lg",
                                align: "center",
                                weight: "regular",
                                action: {
                                  type: "postback",
                                  label: "niiina",
                                  text: "niiinaちゃんをみにいく",
                                  data: "nekosan2",
                                },
                              }, ],
                            },
                          },
                          {
                            type: "bubble",
                            hero: {
                              type: "image",
                              url: "https://i.gyazo.com/8f80dcba9ec8192c1bc4f666efec2df3.jpg",
                              size: "full",
                              aspectRatio: "4:3",
                              aspectMode: "cover",
                              action: {
                                type: "postback",
                                label: "Chibi",
                                text: "Chibiちゃんをみにいく",
                                data: "nekosan3",
                              },
                            },
                            body: {
                              type: "box",
                              layout: "vertical",
                              spacing: "sm",
                              contents: [{
                                type: "text",
                                text: "#Chibi",
                                size: "xl",
                                align: "start",
                                weight: "bold",
                                color: "#5B5B5B",
                                wrap: true,
                              }, ],
                            },
                            footer: {
                              type: "box",
                              layout: "vertical",
                              spacing: "sm",
                              contents: [{
                                type: "text",
                                text: "Chibiちゃんをみにいく",
                                size: "lg",
                                align: "center",
                                weight: "regular",
                                action: {
                                  type: "postback",
                                  label: "Chibi",
                                  text: "Chibiちゃんをみにいく",
                                  data: "nekosan3",
                                },
                              }, ],
                            },
                          },
                        ],
                      },
                    });
                } else if (req.body.events[0].postback.data === "nekosan1") {
                    await useregi(req.body.events[0].source.userId, req.body.events[0].postback.data);
                } else if (req.body.events[0].postback.data === "nekosan2") {
                    await useregi(req.body.events[0].source.userId, req.body.events[0].postback.data);
                } else if (req.body.events[0].postback.data === "nekosan3") {
                    await useregi(req.body.events[0].source.userId, req.body.events[0].postback.data);
                } else if (req.body.events[0].postback.data === "special") {
                    await client.replyMessage(req.body.events[0].replyToken, flexm);
                }
                console.log("postback");
            }
            else if (req.body.events[0].type === "message") {
                ownerName = await kittyUrl(req.body.events[0].source.userId);
              
                let mes = req.body.events[0].message.text;
                if (req.body.events[0].message.text.match("写真をとってきて")) {
                    // ownerName = await kittyUrl(req.body.events[0].source.userId);
                    const mitaiUrl = basecont + ownerName + "/ieneko.jpg";
                    await client.replyMessage(req.body.events[0].replyToken, [{
                        type: "image",
                        originalContentUrl: mitaiUrl,
                        previewImageUrl: mitaiUrl,
                      },
                      {
                        type: "text",
                        text: "とってきたよ！"
                      },
                    ]);
                } else if (req.body.events[0].message.text.match("ごはんをあげる")) {
                    // ownerName = await kittyUrl(req.body.events[0].source.userId);
                    await client.replyMessage(req.body.events[0].replyToken, [{
                        type: "video",
                        originalContentUrl: movieUrl + "/food.mp4",
                        previewImageUrl: "https://i.gyazo.com/df13108eef3544e0212748e66aa51f2e.png",
                    },
                    {
                        type: "text",
                        text: "動画ファイルを読んでるよ！写真が表示されるまで待っててね",
                    },
                    ]);
                } else if (req.body.events[0].message.text.match("おやつをあげる")) {
                    // ownerName = await kittyUrl(req.body.events[0].source.userId);
                    await client.replyMessage(req.body.events[0].replyToken, [{
                        type: "video",
                        originalContentUrl: movieUrl + "/treat.mp4",
                        previewImageUrl: "https://i.gyazo.com/fe17ab39b787e7d89c64fbe4d978b517.png",
                      },
                      {
                        type: "text",
                        text: "動画ファイルを読んでるよ！写真が表示されるまで待っててね",
                      },
                    ]);
                } else if (req.body.events[0].message.text.match("おもちゃをあげる")) {
                    await client.replyMessage(req.body.events[0].replyToken, [{
                        type: "video",
                        originalContentUrl: movieUrl + "/toys.mp4",
                        previewImageUrl: "https://i.gyazo.com/921159c304cae0260edbe59fe41969ed.png",
                      },
                      {
                        type: "text",
                        text: "動画ファイルを読んでるよ！写真が表示されるまで待っててね",
                      },
                    ]);
                } else if (req.body.events[0].message.text.match("niiinaちゃんをみにいく")) {
                    await client.replyMessage(
                        req.body.events[0].replyToken,
              
                      {
                        type: "text",
                        text: "切り替えました！みたいMENUをおしてね"
                      }
                    );
                } else if (req.body.events[0].message.text.match("Ticoちゃんをみにいく")) {
                    await client.replyMessage(req.body.events[0].replyToken, {
                      type: "text",
                      text: "切り替えました！みたいMENUをおしてね",
                    });
                } else if (req.body.events[0].message.text.match("Chibiちゃんをみにいく")) {
                    await client.replyMessage(req.body.events[0].replyToken, {
                      type: "text",
                      text: "切り替えました！みたいMENUをおしてね",
                    });
                } else if (req.body.events[0].message.text.match("とり")) {
                    // ownerName = await kittyUrl(req.body.events[0].source.userId);
                    piyo = await bird(req.body.events[0].source.userId);
                    await client.replyMessage(req.body.events[0].replyToken, {
                      type: "text",
                      text: "鳥さんが鳴いたよ",
                    });
                }
                else {
                    return client.replyMessage(req.body.events[0].replyToken, {
                        type: "text",
                        text: "MENUからえらんでね",
                    });
                    //return client.replyMessage(req.body.events[0].replyToken, flexm);
                }
            }

        }
        else {
            context.res = {
                status: 200,
                body: req.query.message
            };
        }
    }
    else {
        context.res = {
            status: 200,
            body: "Please check the query string in the request body"
        };
    };
}

const useregi = async (userId, data) => {
    let mitai = userId;
    let miruneko = data;
    let task = {
      PartitionKey: {
        _: "User"
      },
      RowKey: {
        _: mitai
      },
      Name: {
        _: mitai
      },
      cat: {
        _: miruneko
      },
    };
    tableService.insertOrMergeEntity("users", task, function (
      error,
      result,
      response
    ) {
      if (!error) {
        // Entity updated
      }
    });
}

const kittyUrl = async (userId) => {
    return new Promise((resolve, reject) => {
      let mitai1 = userId;
      let task2 = {
        PartitionKey: {
          _: "User"
        },
        RowKey: {
          _: mitai1
        },
        Name: {
          _: mitai1
        },
        cat: {
          _: "nekosan1"
        },
      };
      tableService.insertEntity("users", task2, function (
        error,
        result,
        response
      ) {
        if (!error) {
          // Entity updated
        }
      });
  
      // TableService オブジェクトを取得
      //const tableService = new azure.TableService(connectionString);
      // table 情報取得
      const query = new azure.TableQuery()
        .where("PartitionKey eq ?", "User")
        .and("Name eq ?", userId) // かつ RowKey が useridである
        .select("cat");
      tableService.queryEntities("users", query, null, function (error, result) {
        if (error) {
          console.error(error);
          process.exit(1);
        }
        const entries = result.entries;
        // NAMEを取得
        selectkitty = entries[0].cat["_"];
  
        resolve(selectkitty);
      });
    });
}

const bird = async (userId) => {
    let nekocameara = ownerName;
  
    const queueName = nekocameara;
    console.log("\nCreating queue...");
    console.log("\t", queueName);
  
      // Instantiate a QueueClient which will be used to create and manipulate a queue
    const queueClient = new queue.QueueClient(connectionString, queueName);
  
      // Create the queue
    const createQueueResponse = await queueClient.create();
    console.log("Queue created, requestId:", createQueueResponse.requestId);
    const sendMessageResponse = await queueClient.sendMessage(nekocameara);
    console.log("Messages added, requestId:", sendMessageResponse.requestId);
  
    // Get messages from the queue
    const receivedMessagesResponse = await queueClient.receiveMessages({
        numberOfMessages: 5,
    });
  
    console.log(
      "Messages received, requestId:",
      //receivedMessagesResponse.receivedMessageItems[0].messageText
      receivedMessagesResponse.requestId
    );
}
