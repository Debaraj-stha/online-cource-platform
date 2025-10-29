import { appearenceSettings } from '../constants/settings'
import { Link } from 'react-router-dom'

const AccountSettings = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <ul className="space-y-3 text-gray-300">
                {
                    appearenceSettings.map((links) =>
                        <li key={links.link}><Link to={links.link}>{links.text}</Link></li>
                    )
                }
                
            </ul>
        </div>
    )
}

export default AccountSettings
