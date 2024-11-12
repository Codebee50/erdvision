import circleLoader from '@/public/images/circle-spinner.gif'

const CircleLoader = ({w=40, h=40, className=""}) =>{
    return (
        <div className={`${className}`}>
            <img src={circleLoader.src} alt="Loading.." width={w} height={h}/>
        </div>
    )
}

export default CircleLoader