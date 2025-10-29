import type { Feature } from '../@types/Feature'
interface Props{
    feature:Feature
}
const FeatureCard = ({feature}:Props) => {
    return (
        <div  className="feature-card card">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2  font-heading">
                <span>{feature.icon}</span> {feature.title}
            </h3>
            <p className="font-body">{feature.description}</p>
        </div>
    )
}

export default FeatureCard
