import { createContext, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Alert, type AlertProps } from '@/components/Common/Alert';
import type { ChildrenProps } from '@/types';

interface AlertContextInterface {
    // eslint-disable-next-line no-unused-vars
    showAlert: (alert: AlertProps) => void;
    clearAlertStack: () => void;
}

const AlertContext = createContext<AlertContextInterface | undefined>(
    undefined
);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlertContext must be used within a AlertProvider');
    }
    return context;
};

interface AlertProviderProps extends ChildrenProps {
    max: number;
}

export const AlertProvider = ({ max, children }: AlertProviderProps) => {
    type AlertType = AlertProps & { id: string };
    const [alerts, setAlerts] = useState<AlertType[]>([]);

    const showAlert = (alert: AlertProps) => {
        setAlerts((alerts) => {
            const newAlerts = alerts.concat({
                id: uuid(),
                ...alert,
            });
            if (newAlerts.length > max) {
                newAlerts.shift();
            }
            return newAlerts;
        });
    };

    const closeAlert = (id: string) => {
        setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
    };

    const clearAlertStack = () => setAlerts([]);

    return (
        <AlertContext.Provider value={{ showAlert, clearAlertStack }}>
            {alerts.length > 0 && (
                <div className="container pt-4 fixed z-[999999]">
                    {alerts.map((alert) => (
                        <Alert
                            key={alert.id}
                            {...alert}
                            className="mb-4"
                            onClose={() => closeAlert(alert.id)}
                        />
                    ))}
                </div>
            )}

            {children}
        </AlertContext.Provider>
    );
};

export default AlertContext;
