import setcookie from "../component/setcookie";
import { EXPIRE_DEFAULT } from "../dummydb/dataDefault";

export const addToCart = (cartSubject, subject) => {
  const index = cartSubject.findIndex(
    (x) => x.subjectId === subject.datal.subjectId
  );
  const maxCredit = subject.maxcredit;
  if (index >= 0) {
    throw new Error(`Mã học phần ${subject.datal.subjectId} đã được đăng kí`);
  } else {
    let sum = subject.sumCredit + subject.datal.credit;
    if (sum > maxCredit) {
      throw new Error(
        `Số lượng tín chỉ hiện tại là ${sum} đã quá định mức cho phép`
      );
    } else {
      cartSubject.push(subject.datal);
      setcookie("cartDKHP", JSON.stringify(cartSubject), EXPIRE_DEFAULT);
    }
  }
};

export const deleteFromCart=(cartSubject,subjectId)=> {
  cartSubject = cartSubject.filter(
    (x) => x.subjectId !== subjectId
  );
  setcookie("cartDKHP", JSON.stringify(cartSubject), EXPIRE_DEFAULT);
}
