import React, { createContext, useState, useContext } from 'react';
import mqtt, { connect } from 'mqtt';

const MQTTContext = createContext();

export const useMQTT = () => {
  return useContext(MQTTContext);
};

// Provider component that wraps the app and makes MQTT client available
export const MQTTProvider = ({ children }) => {
  const [mqttClient, setMqttClient] = useState(null);

  // Connect to MQTT broker
  const mqtt_connect = (brokerUrl, options = {}) => {
    try {
      const client = mqtt.connect(brokerUrl, options);
      setMqttClient(client);
      return client;
    } catch (error) {
      console.error('Error connecting to MQTT broker:', error);
      return null;
    }
  };

  // Disconnect from MQTT broker
  const mqtt_disconnect = () => {
    if (mqttClient) {
      mqttClient.end();
      setMqttClient(null);
    }
  };

  // MQTT context value
  const value = {
    mqttClient,
    mqtt_connect,
    mqtt_disconnect,
  };

  return (
    <MQTTContext.Provider value={value}>
      {children}
    </MQTTContext.Provider>
  );
};

export default MQTTContext;
