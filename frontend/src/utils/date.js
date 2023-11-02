// 인자로 받은 date 객체를 '연도-월-일 시:분:초' 형식의 string 으로 return 하는 함수
export const getFullDate = (date) => {
  let myDate = date.substr(0, 10);
  let myTime = date.substr(11, 8);

  return `${myDate} ${myTime}`;
};

// 인자로 받은 date 객체를 '연도-월-일' 형식의 string 으로 return 하는 함수
export const getDate = (date) => {
  let myDate = date.substr(0, 10);

  return `${myDate}`;
};
