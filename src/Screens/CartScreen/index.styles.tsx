import {Platform, StatusBar, StyleSheet} from 'react-native';
import {Fonts} from '../../styles/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 120,
  },
  amountLabel: {
    fontSize: 10,
    color: '#161D1F',
    marginBottom: 2,
    fontFamily: Fonts.JakartaRegular,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e8f4f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 6,
    margin: 12,
  },
  couponLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponText: {
    fontSize: 12,
    marginLeft: 6,
    fontFamily: Fonts.JakartaSemiBold,
  },
  icon: {
    marginRight: 6,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 20,
  },
  deliveryText: {
    fontSize: 14,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#161D1F',
    marginBottom: 5,
  },
  mediCashCard: {
    height: 52,
    margin: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#B0B6B8',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F4F5',
  },
  mediCashLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediCashText: {
    fontSize: 12,
    fontFamily: Fonts.JakartaSemiBold,
    color: '#B0B6B8',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#B0B6B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#0088B1',
  },
  radioLabel: {
    fontSize: 14,
    color: '#B0B6B8',
  },
  billSummaryLabel: {
    fontSize: 18,
    fontFamily: Fonts.JakartaRegular,
    marginHorizontal: 12,
    marginTop: 16,
    color: '#161D1F',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountText: {
    fontSize: 18,
    fontFamily: Fonts.JakartaBold,
    color: '#0088B1',
  },
  addressButton: {
    backgroundColor: '#0088B1',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  addressButtonText: {
    color: '#fff',
    fontFamily: Fonts.JakartaBold,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },

  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconSpacing: {
    marginRight: 16,
  },
  safeHeader: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
