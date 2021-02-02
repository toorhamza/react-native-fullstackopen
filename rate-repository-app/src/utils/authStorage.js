import AsyncStorage from '@react-native-community/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

 async getAccessToken() {
    const result = await AsyncStorage.getItem(
        `${this.namespace}:tokens`,
      );

      return result ? JSON.parse(result) : [];
}

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
        `${this.namespace}:tokens`,
        JSON.stringify(accessToken),
      );
    }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:tokens`);  }
}

export default AuthStorage;