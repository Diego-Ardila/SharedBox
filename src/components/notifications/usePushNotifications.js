import { useState, useEffect } from "react";
import {registerSubscription, cancelSubscription, sendNotification} from '../../utils/HTTPrequests'

import {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription
} from "./push-notifications";

const pushNotificationSupported = isPushNotificationSupported();

export default function usePushNotifications() {
  const [userConsent, setUserConsent] = useState(Notification.permission);
  const [userSubscription, setUserSubscription] = useState(null);
  const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pushNotificationSupported) {
      setLoading(true);
      setError(false);
      registerServiceWorker().then(() => {
        setLoading(false);
      });
    }
  }, []);
  
  useEffect(() => {
    setLoading(true);
    setError(false);
    const getExistingSubscription = async () => {
      const existingSubscription = await getUserSubscription();
      setUserSubscription(existingSubscription);
      setLoading(false);
    };
    getExistingSubscription();
  }, []);

  const onClickSubscribeToNotifications = async () => {
    try {
      setLoading(true);
      const permission = await askUserPermission()
      setUserConsent(permission);
      if (permission !== "granted"){  
        throw new Error('User did not granted the permission');
      } 
      await createNotificationSubscription()
      await registerSubscription("/subscription", userSubscription)
      setPushServerSubscriptionId(true);
      setError(false);
    } catch(err){
      console.error("Couldn't create the notification subscription", err, "name:", err.name, "message:", err.message, "code:", err.code);
      setError(err);
    } finally {
      setLoading(false);
    }   
  };

  const onClickCancelSubscriptionToPushServer = async () => {
    try {
      setLoading(true);
      setError(false);
      await cancelSubscription("/subscription", userSubscription)
      setPushServerSubscriptionId(false);
    } catch(err){      
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const onClickSendNotification = async () => {
    try {
      setLoading(true);
      setError(false);
      await sendNotification("/subscription")
      setLoading(false);
    } catch (err){
      setLoading(false);
      setError(err);
    }
    
  };

  return {
    onClickSubscribeToNotifications,
    onClickCancelSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    userConsent,
    pushNotificationSupported,
    userSubscription,
    error,
    loading
  };
}