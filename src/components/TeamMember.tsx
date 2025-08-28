
import type { Team } from "../@types/Tesm";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
interface Props {
    member: Team
}
const TeamMember = ({ member }: Props) => {
    return (

        <div

            className="flex-shrink-0 w-56 bg-white rounded-xl shadow-lg p-5 flex flex-col items-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
        >
            <img
                src={member.avatar}
                alt={member.name}
                className="w-28 h-28 rounded-full mb-4 border-2 border-gray-200"
            />
            <h3 className="font-semibold text-lg text-center">{member.name}</h3>
            <p className="text-sm text-gray-500 text-center">{member.role}</p>

            <div className="flex gap-3 mt-3">
                {member.github && (
                    <a
                        href={member.github}
                        target="_blank"
                        className="text-gray-600 hover:text-black transition"
                    >
                        <FaGithub />
                    </a>
                )}
                {member.linkedin && (
                    <a
                        href={member.linkedin}
                        target="_blank"
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        <FaLinkedin />
                    </a>
                )}
                {member.x && (
                    <a
                        href={member.x}
                        target="_blank"
                        className="text-gray-600 hover:text-blue-400 transition"
                    >
                        <FaX />
                    </a>
                )}
                {member.email
                    && (
                        <a
                            href={`mailto:${member.email}`}
                            target="_blank"
                            className="text-gray-600 hover:text-blue-400 transition"
                        >
                            <MdEmail />
                        </a>
                    )}
            </div>
        </div>

    );
}
export default TeamMember