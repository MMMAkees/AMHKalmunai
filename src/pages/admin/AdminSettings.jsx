import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import { hospitalInfo } from '../../data/hospital';

export default function AdminSettings() {
  const [hospital, setHospital] = useState({
    name: hospitalInfo.name,
    phone: hospitalInfo.phone,
    email: hospitalInfo.email,
    address: hospitalInfo.address,
  });
  const [queueRules, setQueueRules] = useState({
    maxWaitTime: 60,
    tokenPrefix: 'A',
    autoCallInterval: 5,
    maxRecall: 3,
  });
  const [smsSettings, setSmsSettings] = useState({
    enabled: true,
    provider: 'Dialog Axiata',
    appointmentReminder: true,
    queueUpdate: true,
  });
  const [notifSettings, setNotifSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    doctorDelayAlert: true,
  });

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
      <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">{title}</h3>
      {children}
    </div>
  );

  const InputField = ({ label, value, onChange, type = 'text' }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30" />
    </div>
  );

  const Toggle = ({ label, checked, onChange }) => (
    <label className="flex items-center justify-between py-2">
      <span className="text-sm text-gray-700">{label}</span>
      <button type="button" onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-primary-600' : 'bg-gray-300'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${checked ? 'translate-x-5' : ''}`} />
      </button>
    </label>
  );

  return (
    <div>
      <PageHeader title="Settings" subtitle="Configure hospital system settings" />

      <Section title="Hospital Information">
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label="Hospital Name" value={hospital.name} onChange={(v) => setHospital({ ...hospital, name: v })} />
          <InputField label="Phone" value={hospital.phone} onChange={(v) => setHospital({ ...hospital, phone: v })} />
          <InputField label="Email" value={hospital.email} onChange={(v) => setHospital({ ...hospital, email: v })} />
          <InputField label="Address" value={hospital.address} onChange={(v) => setHospital({ ...hospital, address: v })} />
        </div>
        <button className="mt-4 px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700">Save Changes</button>
      </Section>

      <Section title="Queue Rules">
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField label="Max Wait Time (minutes)" value={queueRules.maxWaitTime} onChange={(v) => setQueueRules({ ...queueRules, maxWaitTime: v })} type="number" />
          <InputField label="Token Prefix" value={queueRules.tokenPrefix} onChange={(v) => setQueueRules({ ...queueRules, tokenPrefix: v })} />
          <InputField label="Auto Call Interval (minutes)" value={queueRules.autoCallInterval} onChange={(v) => setQueueRules({ ...queueRules, autoCallInterval: v })} type="number" />
          <InputField label="Max Recall Attempts" value={queueRules.maxRecall} onChange={(v) => setQueueRules({ ...queueRules, maxRecall: v })} type="number" />
        </div>
        <button className="mt-4 px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700">Save Queue Rules</button>
      </Section>

      <Section title="SMS Settings">
        <Toggle label="Enable SMS Notifications" checked={smsSettings.enabled} onChange={(v) => setSmsSettings({ ...smsSettings, enabled: v })} />
        <InputField label="SMS Provider" value={smsSettings.provider} onChange={(v) => setSmsSettings({ ...smsSettings, provider: v })} />
        <Toggle label="Appointment Reminders" checked={smsSettings.appointmentReminder} onChange={(v) => setSmsSettings({ ...smsSettings, appointmentReminder: v })} />
        <Toggle label="Queue Update Alerts" checked={smsSettings.queueUpdate} onChange={(v) => setSmsSettings({ ...smsSettings, queueUpdate: v })} />
        <button className="mt-4 px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700">Save SMS Settings</button>
      </Section>

      <Section title="Notification Settings">
        <Toggle label="Email Notifications" checked={notifSettings.emailNotifications} onChange={(v) => setNotifSettings({ ...notifSettings, emailNotifications: v })} />
        <Toggle label="Push Notifications" checked={notifSettings.pushNotifications} onChange={(v) => setNotifSettings({ ...notifSettings, pushNotifications: v })} />
        <Toggle label="Doctor Delay Alerts" checked={notifSettings.doctorDelayAlert} onChange={(v) => setNotifSettings({ ...notifSettings, doctorDelayAlert: v })} />
        <button className="mt-4 px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700">Save Notification Settings</button>
      </Section>
    </div>
  );
}
