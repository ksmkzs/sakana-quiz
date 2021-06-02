console.log("読み込まれました");

//問題と答え
let q = [["鯏", "あさり", 0], ["鯵", "あじ", 0], ["海豚", "いるか", 0], ["鱏", "えい", 0], ["鱸", "すずき", 0], ["鰹", "かつお", 0], ["鯖", "さば", 0], ["鰆", "さわら", 0], ["鯱", "しゃち", 0], ["鯛", "たい",0], ["蛸", "たこ", 0],["鱈", "たら", 0],["鰌", "どじょう", 0],["鯰", "なまず", 0],["鯡", "にしん", 0],["鰰", "はたはた", 0],["鱧", "はも", 0],["鮃", "ひらめ", 0],["鰒", "ふぐ", 0],["蛸", "たこ", 0],["鰤", "ぶり", 0],["𩸽", "ほっけ", 0],["鰡", "ぼら", 0],["鮪", "まぐろ", 0],["鱒", "ます", 0],["鰐", "わに", 0],["鮎", "あゆ", 0],["鮑", "あわび", 0],["鱓", "うつぼ", 0],["鰻", "うなぎ", 0],["鰕", "えび", 0],["鰈", "かれい", 0],["鱚", "きす", 0],["鯨", "くじら", 0],["鯉", "こい", 0],["鮭", "さけ", 0],["鮫", "さめ", 0]];


//問題数をカウントする
let count = 0;

//問題の結果を表示するための変数
let memoryAnswer = new Array(10);


//選択肢の数の中でランダムに値を生成する関数
const rand = () => {
  return Math.floor(Math.random() * q.length);
}

//被りがないように問題をランダムで選ぶ関数
const randJ = () => {
  let num = Math.floor(Math.random() * q.length);
  if (q[num][2] === -1) {
    return randJ();
  } else {
    q[num][2] = -1;
    return num;
  }
}



//配列の値を入れ替える関数
const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//問題番号から選択肢を生成する関数
const generateAnswers = (number) => {
  let Answers = new Array(4);
  Answers[0]=q[number][1];
  let AAA =0;
  let zeroToQ = new Array(q.length);
  for(let i=0;i<zeroToQ.length;i++){
    zeroToQ[i]=i;
  }
  zeroToQ[number]=-1;

  for(let i=1;i<Answers.length;i++){
    let AAA =0;
    while(AAA !=1){
      let BBB = rand();
      if(zeroToQ[BBB]!=-1){
        zeroToQ[BBB] = -1;
        Answers[i] = q[BBB][1];
        AAA =1;
      }
    }
  }
  return Answers;
}

//正解の数を計測
let rightAnswerCount = 0;


//問題の制限時間
let remainMsec = 10000;



//問題を画面上に表示させる関数  引数として(問題番号,選択肢)
const showQuestion = (a, b) => {

  count++;
  const questionElem = document.getElementById("question");
  questionElem.textContent = `${count + "問目 " + q[a][0]}`;
  //question内のテキストにもんだいを書き入れる

  const answerElem = document.getElementById("answers");
  remainMsec = 10000;
  const initTime = Date.now();
  const jikanElem = document.getElementById("jikan");
  jikanElem.textContent = `${"残り時間 " + 10}`;
  const timer = setInterval(() => {
    remainMsec -= 1000;
    const currentTime = Date.now();
    if (currentTime - initTime > 10000) {

      clearInterval(timer);
      memoryAnswer[count] = [count,q[a][0],q[a][1],"時間切れ！","不正解"];
      clearQuestionAnswer();

      if (count != 10) {
        const questionNumber = randJ();
        const question = shuffle(generateAnswers(questionNumber));
        showQuestion(questionNumber, question);
      } else {
        showResult();
      }
    } else {
      jikanElem.textContent = `${"残り時間 " + remainMsec / 1000}`;
    }
  }, 1000);
  //十秒のタイマー設置


  for (const x of b) {
    const liElem = document.createElement("li");
    const buttonElem = document.createElement("button");
    buttonElem.textContent = x;
    liElem.appendChild(buttonElem);
    answerElem.appendChild(liElem);
    buttonElem.addEventListener("click", () => {
      clearInterval(timer);
      if (x === q[a][1]) {
        memoryAnswer[count] = [count,q[a][0],q[a][1],x,"正解!"];
        clearQuestionAnswer();
        rightAnswerCount++;
        if (count != 10) {
          const questionNumber = randJ();
          const question = shuffle(generateAnswers(questionNumber));
          showQuestion(questionNumber, question);
        } else {
          showResult();
        }
      } else {
        memoryAnswer[count] = [count,q[a][0],q[a][1],x,"不正解"];
        clearQuestionAnswer();
        if (count != 10) {
          const questionNumber = randJ();
          const question = shuffle(generateAnswers(questionNumber));
          showQuestion(questionNumber, question);
        } else {
          showResult();
        }
      }
    });
  }
}

//結果画面を表示する
const showResult = () => {
  const jikanElem = document.getElementById("jikan");
  jikanElem.textContent = "";
  const resultA = document.getElementById("resultA");
  resultA.textContent = `${"問題終了！"}`;
  const small = document.getElementById("small");
  small.textContent = `${"あなたの正解数は...."}`;
  const score = document.getElementById("score");
  score.textContent = `${rightAnswerCount + "/10問"}`;


  const inTable = document.getElementById("inTable");
  inTable.id="table";
  const table = document.getElementById("table");
  for(let i = 1; i<=10; i++){
    const tr = table.rows[i];
    for(let j=0;j<=4;j++){
      const td = tr.cells[j];
      td.textContent = `${memoryAnswer[i][j]}`;
      if(memoryAnswer[i][j]==="正解!"){
        td.className="c";
      }else if(memoryAnswer[i][j]==="不正解"){
        td.className="f";
      }
    }
  }
  const restart = document.createElement("button");
  restart.textContent = `${"もう一度行う"}`;
  const restartElem = document.getElementById("restart");
  restartElem.appendChild(restart);
  restart.addEventListener("click", () => {
    resultA.textContent = "";
    small.textContent = "";
    score.textContent = "";
    table.id="inTable";
    count=0;
    rightAnswerCount=0;
    for (let i = 0; i < q.length; i++) {
      q[i][2] = 0;
    }

    const questionNumber = randJ();
    const question = shuffle(generateAnswers(questionNumber));
    showQuestion(questionNumber, question);
    restart.remove();
  });
}



//問題と選択肢を削除する関数
const clearQuestionAnswer = () => {
  const questionElem = document.getElementById("question");
  questionElem.textContent = "";
  const answerElem = document.getElementById("answers");
  while (answerElem.firstChild) {
    answerElem.removeChild(answerElem.firstChild);
  }
}



const startButton = document.getElementById("start_button");
//最初のボタンをおしたときの動作
startButton.addEventListener("click", () => {
  document.getElementById("first").textContent="";
  startButton.remove();
  const questionNumber = randJ();
  const question = shuffle(generateAnswers(questionNumber));
  showQuestion(questionNumber, question);

});
