import AppLayout from '../components/templates/AppLayout';
import { useState, useEffect, useRouter, FontAwesomeIcon, Link, Image, axios } from '../libraries';
import { faSearch, faEye, faEyeSlash, faBoxesStacked } from '@fortawesome/free-solid-svg-icons';
export default function About() {
  useEffect(() => {
    let answer = solution('5525', '1255');
    // console.log(answer);
  }, []);

  function solution(X, Y) {
    var answer = '';

    if (parseInt(X.length) < 3 || parseInt(X.length) > 3000000) return '';
    if (parseInt(Y.length) < 3 || parseInt(Y.length) > 3000000) return '';

    let arr1 = Array.from(X).sort((a, b) => b - a);
    let arr2 = Array.from(Y).sort((a, b) => b - a);

    let stack = [];
    for (let i = 9; i >= 0; i--) {
      let cnt1 = arr1.filter((x) => parseInt(x) === i).length;
      let cnt2 = arr2.filter((x) => parseInt(x) === i).length;
      // console.log(i, cnt1, cnt2);
      if (cnt1 > 0 && cnt2 > 0) {
        let chk = cnt1 >= cnt2 ? cnt2 : cnt1;
        for (let j = 0; j < chk; j++) {
          stack.push(i.toString());
        }
      }
    }

    if (stack.length === 0) {
      answer = '-1';
    } else {
      answer = stack.join('');
      answer = stack[0] !== '0' ? answer : '0';
    }

    return answer;
  }

  return (
    <div>
      <AppLayout
        mode={'dev'}
        title="404"
        description=""
        showLeftSidebar={false}
        showRightSidebar={false}
        showHeader={false}
        showFooter={false}
      >
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="text-center">
            <h1 className="display-1 fw-bold">About</h1>
          </div>
        </div>
      </AppLayout>
    </div>
  );
}
