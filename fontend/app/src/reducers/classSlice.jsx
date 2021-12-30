import setcookie from "../component/setcookie";
import { EXPIRE_DEFAULT } from "../dummydb/dataDefault";

export const addToCart = (cartClass, classObj) => {
  const index = cartClass.findIndex(
    (x) => x.classId === classObj.datal.subjectId
  );
  const maxCredit = classObj.maxcredit;
  if (index >= 0) {
    throw new Error(`Mã lớp học ${classObj.datal.classId} đã được đăng kí`);
  } else {
    let sum = classObj.sumCredit + classObj.datal.credit;
    if (sum > maxCredit) {
      throw new Error(
        `Số lượng tín chỉ hiện tại là ${sum} đã quá định mức cho phép`
      );
    } else {
      cartClass.push(classObj.datal);
      setcookie("cartDKLH", JSON.stringify(cartClass), EXPIRE_DEFAULT);
    }
  }
};

export const deleteFromCart=(cartClass,classId)=> {
  cartClass = cartClass.filter(
    (x) => x.classId !== classId
  );
  setcookie("cartDKLH", JSON.stringify(cartClass), EXPIRE_DEFAULT);
}
