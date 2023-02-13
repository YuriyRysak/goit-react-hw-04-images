// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { RotatingTriangles } from 'react-loader-spinner';
import './Loader.css';

export const Loader = () => {
  return (
    <div className="Loader">
      <RotatingTriangles
        visible={true}
        height="180"
        width="180 "
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
      />
    </div>
  );
};
