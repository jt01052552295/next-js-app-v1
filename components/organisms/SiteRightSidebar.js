import {
  React,
  useState,
  PropTypes,
  Fragment,
  useEffect,
  useRecoilState,
  useRecoilValue,
} from '../../libraries';
import { newsState, newsSelector, textState, charCountState } from '../../atoms';

export default function SiteRightSidebar({ ...props }) {
  // const news = useRecoilValue(newsSelector);

  const [text, setText] = useRecoilState(textState);
  const count = useRecoilValue(charCountState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  useEffect(() => {
    // console.log('SiteRightSidebar', news);
  }, []);

  return (
    <Fragment>
      <aside className="sidebar-wrapper  col-2">
        <div className="container-fluid">
          <div>
            <input type="text" value={text} onChange={onChange} />
            <br />
            Echo: {text}
            <br />
            Character Count: {count}
          </div>
        </div>
      </aside>
    </Fragment>
  );
}
