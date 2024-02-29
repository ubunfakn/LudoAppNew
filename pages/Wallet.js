import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Background from '../components/Background'
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
// import AllInOneSDKManager from 'paytm_allinone_react-native';
import RazorpayCheckout from 'react-native-razorpay';

export default function Wallet() {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);
  const [showWithdrawMoneyWithPaytm, setShowWithdrawMoneyWithPaytm] = useState(false);
  const [showWithdrawMoneyWithAccount, setShowWithdrawMoneyWithAccount] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [amountToBeAdded, setAmountToBeAdded] = useState("");
  const navigation = useNavigation();
  const changeState = () => {
    setShowAddMoney(false);
    setShowPaymentMethod(true)
  }
  const startPayment = async () => {
    // try {
    //   const orderId = 'your_order_id';
    //   const mid = 'your_merchant_id';
    //   const tranxToken = 'your_transaction_token';
    //   const amount = 'your_transaction_amount';
    //   const callbackUrl = 'your_callback_url';
    //   const isStaging = true; // Change this based on your environment
    //   const appInvokeRestricted = false; // Change this based on your requirements
    //   const urlScheme = 'your_url_scheme';
  
    //   const result = await AllInOneSDKManager.startTransaction(
    //     orderId,
    //     mid,
    //     tranxToken,
    //     amount,
    //     callbackUrl,
    //     isStaging,
    //     appInvokeRestricted,
    //     urlScheme
    //   );
  
    //   console.log('Transaction Result:', result);
    //   // Handle the result as needed (e.g., update UI, navigate, etc.)
    // } catch (error) {
    //   console.error('Transaction Error:', error);
    //   // Handle errors (e.g., show error message to the user)
    // }
    let options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_5SKZYSprPJkNCr',
      amount: '90',
      name: 'Railworld India',
      order_id: 'order_MLePtgVjCa8tdM',//Replace this with an order_id created using Orders API.
      prefill: {
        email: 'ankit2003nashine@gmail.com',
        contact: '8602185525',
        name: 'Ankit Kumar'
      },
      theme: {color: '#53a20e'}
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      console.log(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
  };
  return (
    <View>
      <Background></Background>
      <TouchableOpacity disabled={showAddMoney || showPaymentMethod ? true : false} onPress={() => navigation.goBack()}>
        <LinearGradient
          colors={['#EE2121', '#FF0000']}
          start={[0, 0]}
          end={[1, 0]}
          locations={[0.3376, 0.9599]}
          style={{ width: 30, height: 30, left: 10, top: 20, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, top: -4 }}>&lt;</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={{ textAlign: "center", alignItems: "center" }}>
          <Image style={styles.walletimg} source={require('../assets/wallet.png')} />
          <Text style={{ fontWeight: "bold", fontSize: 24, color: "white", top: -80 }}>Total Balance</Text>
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "#F5C601", top: -70 }}>$50</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", top: -40, left: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>Deposits</Text>
            <View style={{ flexDirection: "row" }}>
              <Image style={{ top: 10 }} source={require("../assets/coin.png")} />
              <Text style={{ fontWeight: "bold", fontSize: 22, color: "#F5C601", top: 7, left: 8 }}>$50</Text>
            </View>
          </View>
          <View style={{ top: -10, left: 110 }}>
            <TouchableOpacity onPress={() => setShowAddMoney(true)} style={{ width: 30, height: 30, borderRadius: 30, backgroundColor: "#69BA5C", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
              <Ionicons color={"white"} style={{ fontWeight: "bold" }} name='add' size={20} />
            </TouchableOpacity>
            <View style={{ width: 70, height: 20, backgroundColor: "#69BA5C", top: -25, left: 21, borderRadius: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 10, color: "white", top: 3, left: 11 }}>Add money</Text>
            </View>
          </View>
        </View>


        <View style={{ width: 255, height: 2, backgroundColor: "#CDCBCB", left: 18, top: -20 }}></View>


        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", top: 2, left: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>Winning</Text>
            <View style={{ flexDirection: "row" }}>
              <Image style={{ top: 10 }} source={require("../assets/winning.png")} />
              <Text style={{ fontWeight: "bold", fontSize: 22, color: "#F5C601", top: 7, left: 8 }}>$50</Text>
            </View>
          </View>
          <View style={{ top: 10, left: 110 }}>
            <TouchableOpacity onPress={() => {setShowPaymentMethod(true);setIsWithdrawing(true)}}>
              <Image source={require("../assets/winningmoney.png")} />
            </TouchableOpacity>
            <View style={{ width: 70, height: 20, backgroundColor: "#9F8327", top: -25, left: 16, zIndex: -1, borderRadius: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 10, color: "white", top: 3, left: 15 }}>Withdraw</Text>
            </View>
          </View>
        </View>

        <View style={{ width: 255, height: 2, backgroundColor: "#CDCBCB", left: 18, top: 18 }}></View>


        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", top: 40, left: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "white" }}>Bonus</Text>
            <View style={{ flexDirection: "row" }}>
              <Image style={{ top: 10 }} source={require("../assets/bonus.png")} />
              <Text style={{ fontWeight: "bold", fontSize: 22, color: "#F5C601", top: 7, left: 8 }}>$50</Text>
            </View>
          </View>
        </View>
      </View>


      <View style={styles.container2}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.tranButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Transaction History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.withHisButton}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Withdraw History</Text>
          </TouchableOpacity>
        </View>
      </View>

      {
        showAddMoney ? (
          <View style={styles.addmoneyContainer}>
            <TouchableOpacity onPress={() => setShowAddMoney(false)} style={styles.crossButton}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>X</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white", left: -80 }}>Enter Money</Text>
            <TextInput value={amountToBeAdded} style={styles.input} placeholder='amount' placeholderTextColor={"#A8A8A8"}></TextInput>
            <View style={{ flexDirection: "row", flexWrap: "wrap", left: -8, top: 30 }}>
              <TouchableOpacity style={styles.filters} onPress={()=> setAmountToBeAdded("100")}>
                <Text style={styles.buttonText}>100</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filters} onPress={()=> setAmountToBeAdded("500")}>
                <Text style={styles.buttonText}>500</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filters} onPress={()=> setAmountToBeAdded("1000")}>
                <Text style={styles.buttonText}>1000</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.couponBox}>
              <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>Apply Coupon</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.proceedButton} onPress={changeState}>
              <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>Add money</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )
      }
      {
        showPaymentMethod ? (
          <View style={styles.addmoneyContainer}>
            <TouchableOpacity onPress={() => {setShowPaymentMethod(false);setIsWithdrawing(false);setIsDepositing(false)}} style={styles.crossButton}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={isWithdrawing?()=>{setShowWithdrawMoneyWithPaytm(true);setShowPaymentMethod(false)}:()=>{startPayment()}}>
              <LinearGradient
                colors={['#07F728', '#03C91E']}
                start={[0, 0]}
                end={[1, 0]}
                locations={[0.3376, 0.9599]}
                style={{ width: 190, height: 80, top: 45, borderRadius: 30, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, top: -4 }}>Paytm</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={{top:30}} onPress={isWithdrawing?()=>{setShowWithdrawMoneyWithAccount(true);setShowPaymentMethod(false)}:null}>
              <LinearGradient
                colors={['#07F728', '#03C91E']}
                start={[0, 0]}
                end={[1, 0]}
                locations={[0.3376, 0.9599]}
                style={{
                  width: 190, height: 80, top: 85, borderRadius: 30, alignItems: "center", justifyContent: "center"
                }}>
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, top: -4 }}>Bank Transfer</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )
      }
      {
        showWithdrawMoneyWithPaytm ?
          (<View style={styles.addmoneyContainer}>
            <TouchableOpacity onPress={() => {setShowWithdrawMoneyWithPaytm(false);setIsWithdrawing(false);}} style={styles.crossButton}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>X</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>Transfer to Paytm</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 75, top: 20, left: -10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>Available Balance</Text>
              </View>
              <Text style={[styles.input, { left: 10, width: 200,paddingTop:6 }]}>$60</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 75, top: 20, left: -10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>Paytm Number</Text>
              </View>
              <TextInput style={[styles.input, { left: 30, width: 200, left: 10 }]} placeholder='Enter Mobile no.' placeholderTextColor={"#A8A8A8"}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 75, top: 20, left: -10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>Withdraw Amount</Text>
              </View>
              <TextInput style={[styles.input, { left: 30, width: 200, left: 10 }]} placeholder='Enter Amount' placeholderTextColor={"#A8A8A8"}></TextInput>
            </View>

            <TouchableOpacity style={[styles.proceedButton, { top: 20 }]}>
              <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>Withdraw</Text>
            </TouchableOpacity>
          </View>) :
          (<View></View>)
      }
      {
        showWithdrawMoneyWithAccount ?
          (<View style={styles.addmoneyContainer}>
            <TouchableOpacity onPress={() => {setShowWithdrawMoneyWithAccount(false);setIsWithdrawing(false);}} style={styles.crossButton}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>X</Text>
            </TouchableOpacity>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>Transfer to Account</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 75, top: 20, left: -10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>Available Balance</Text>
              </View>
              <Text style={[styles.input, { left: 10, width: 200,paddingTop:4, height:35 }]}>$60</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 75, top: 5, left: -10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>Account Number</Text>
              </View>
              <TextInput style={[styles.input, {width: 200, left: 10, top:5 }]} placeholder='Enter Account no.' placeholderTextColor={"#A8A8A8"}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 75, top: -4, left: -10 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>IFSC Code</Text>
              </View>
              <TextInput style={[styles.input, { left: 30, width: 200, left: 10, top:-4 }]} placeholder='Enter IFSC Code' placeholderTextColor={"#A8A8A8"}></TextInput>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: 75, top: 20, left: -10, top:-19 }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: "white" }}>Withdraw Amount</Text>
              </View>
              <TextInput style={[styles.input, { left: 30, width: 200, left: 10, top:-19 }]} placeholder='Enter Amount' placeholderTextColor={"#A8A8A8"}></TextInput>
            </View>

            <TouchableOpacity style={[styles.proceedButton, { top: -30 }]}>
              <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>Withdraw</Text>
            </TouchableOpacity>
          </View>) :
          (<View></View>)
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 450,
    backgroundColor: "#391C1C",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#8D8E4E",
    // justifyContent:"center",
    top: 20,
    left: 45,
    paddingTop: 60
  },
  container2: {
    width: 300,
    height: 260,
    backgroundColor: "#391C1C",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#8D8E4E",
    left: 45,
    paddingTop: 60,
    top: 50
  },
  walletimg: {
    top: -100
  },
  tranButton: {
    backgroundColor: "#720123",
    width: 135,
    height: 30,
    borderColor: "#F5C601",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    top: -76,
    left: 10
  },
  withHisButton: {
    backgroundColor: "#C78D9E",
    width: 135,
    height: 30,
    borderColor: "#F5C601",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    top: -76,
    left: 15
  },
  addmoneyContainer: {
    backgroundColor: "#5D3939",
    width: 350,
    height: 400,
    top: -550,
    left: 20,
    borderColor: "#8D8E4E",
    borderWidth: 1,
    borderRadius: 25,
    alignItems: "center",
    textAlign: "center"
  },
  crossButton: {
    width: 35,
    height: 35,
    borderRadius: 17,
    backgroundColor: "#F15352",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    left: 140,
    top: 10
  },
  input: {
    width: 255,
    height: 45,
    backgroundColor: "#720123",
    textAlign: "center",
    top: 25,
    marginBottom: 35,
    borderWidth: 1,
    borderColor: "#F5C601",
    borderRadius: 10,
    color: "white",
    fontSize: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  filters: {
    width: 77,
    marginLeft: 15,
    alignItems: 'center',
    backgroundColor: '#720123',
    borderWidth: 1,
    borderColor: '#F5C601',
    height: 45,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    padding: 6,
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  couponBox: {
    width: 185,
    height: 55,
    top: 60,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderColor: "#DDDDDD",
    borderWidth: 2
  },
  proceedButton: {
    width: 105,
    height: 40,
    backgroundColor: "#07F728",
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 1,
    top: 90,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
})