import { I18nManager } from 'react-native';

export function setupRTL() {
  if (!I18nManager.isRTL) {
    I18nManager.forceRTL(true);
    I18nManager.allowRTL(true);
  }
}
