import setcookie from "../component/setcookie";
import { EXPIRE_DEFAULT } from "../dummydb/dataDefault";
function CheckTime(list, timeStart, day) {
  const indexTimeStart = list.findIndex(
    (x) => x.timeStart <= timeStart && x.timeEnd >= timeStart
  );
  const indexDay = list.findIndex((x) => x.day === day);
  if (indexDay >= 0 && indexTimeStart >= 0) {
    return indexDay;
  }
  return "";
}

export const addToCart = (cartClass, classObj) => {
  const index = cartClass.findIndex(
    (x) => x.classId === classObj.datal.classId
  );
  const index1 = cartClass.findIndex(
    (x) => x.subjectId === classObj.datal.subjectId
  );
  const timeStart = classObj.datal.timeStart;
  const day = classObj.datal.day;
  const maxCredit = classObj.maxcredit;
  const statusDK = classObj.datal.status;
  if (statusDK === 0) {
    throw new Error(`Lớp ${classObj.datal.classId} đã bị hủy`);
  } else if (index >= 0) {
    throw new Error(`Mã lớp học ${classObj.datal.classId} đã được đăng kí`);
  } else if (index1 >= 0) {
    throw new Error(`Mã học phần ${classObj.datal.subjectId} đã được đăng kí`);
  } else {
    let sum = classObj.sumCredit + classObj.datal.credit;
    if (sum > maxCredit) {
      throw new Error(
        `Số lượng tín chỉ hiện tại là ${sum} đã quá định mức cho phép`
      );
    } else if (CheckTime(cartClass, timeStart, day) !== "") {
      throw new Error(
        `Trùng lich với mã lớp ${
          cartClass[CheckTime(cartClass, timeStart, day)].classId
        }`
      );
    } else {
      cartClass.push(classObj.datal);
      setcookie("cartDKLH", JSON.stringify(cartClass), EXPIRE_DEFAULT);
    }
  }
};

export const deleteFromCart = (cartClass, classId) => {
  cartClass = cartClass.filter((x) => x.classId !== classId);
  setcookie("cartDKLH", JSON.stringify(cartClass), EXPIRE_DEFAULT);
};
