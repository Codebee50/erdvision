import spinner from '@/public/images/spinner.gif'

const Loader = ({w=30, h=30}) => {
  return(
      <div>
          <img src={spinner.src} alt={"Loading.."} width={w} height={h}/>
      </div>
  )
}

export default Loader;