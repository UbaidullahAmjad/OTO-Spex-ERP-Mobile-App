import Toast from 'react-native-toast-message';
export function emailValidation(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  } else {
    return false;
  }
}
export function otherStatus(res) {
  if (res.status_code == 400) {
    Toast.show({
      type: 'error',
      text1: 'Sorry!',
      text2: res.message,
    });
  } else if (res.status_code == 200) {
    Toast.show({
      type: 'success',
      text2: res.message,
    });
  } else if (res.status_code == 201) {
    Toast.show({
      type: 'success',
      text2: res.message,
    });
  }
}
export function rejection(error, dispatch) {
  Toast.show({
    type: 'error',
    text1: 'Internet!',
    text2: 'Kindly Check Your Internet Connection',
  });
}
