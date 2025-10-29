import type { Testimonial } from '../@types/Testimonial'
interface Props {
    testimonial: Testimonial
}
const TestimonialCard = ({ testimonial }: Props) => {
    return (
        <div
            className="card font-body"
        >
            <div className="flex items-center gap-4 mb-4">
                {testimonial.avatar &&
                    <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                }
                <div>
                    <h4 className="text-md font-semibold ">{testimonial.name}</h4>
                    <p className="text-sm">{testimonial.title}</p>
                </div>
            </div>
            <p className="italic mb-3">“{testimonial.message}”</p>
            <div className="text-yellow-400">
                {"★".repeat(Math.floor(testimonial.rating))}
                {testimonial.rating % 1 !== 0 && "½"}
            </div>
        </div>

    )
}

export default TestimonialCard
