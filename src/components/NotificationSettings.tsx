import React from 'react'

const NotificationSettings = () => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <ul className="space-y-3 text-gray-300">
                <li><input type="checkbox" defaultChecked /> Email Notifications</li>
                <li><input type="checkbox" /> In-app Notifications</li>
                <li><input type="checkbox" /> Course Updates</li>
                <li><input type="checkbox" /> Assignment Deadlines</li>
                <li><input type="checkbox" /> Enrollment Alerts</li>
                <li><input type="checkbox" /> Payment Alerts</li>
            </ul>
        </div>
    )
}

export default NotificationSettings
