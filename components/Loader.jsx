import spinner from "@/public/images/spinner.gif";
import circleSpinner from "@/public/images/circle-spinner.gif";
const Loader = ({ w = 30, h = 30, variant="square" }) => {
  const getImage = ()=>{
    if(variant === "circle"){
      return circleSpinner
    }
    return spinner
  }
  return (
    <div>
      
      <img src={getImage().src} alt={"Loading.."} width={w} height={h} />
    </div>
  );
};

export default Loader;
