import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import { Players, row } from '../styles/forPlayers'
import { Audio } from 'expo-av';
soundObject = new Audio.Sound()
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      position11: -11, position12: -21, position13: -31, position14: -41,
      position21: -12, position22: -22, position23: -32, position24: -42,
      position31: -13, position32: -23, position33: -33, position34: -43,
      position41: -14, position42: -24, position43: -34, position44: -44,
      showAnimatedToken11: false, showAnimatedToken12: false, showAnimatedToken13: false, showAnimatedToken14: false,
      showAnimatedToken21: false, showAnimatedToken22: false, showAnimatedToken23: false, showAnimatedToken24: false,
      showAnimatedToken31: false, showAnimatedToken32: false, showAnimatedToken33: false, showAnimatedToken34: false,
      showAnimatedToken41: false, showAnimatedToken42: false, showAnimatedToken43: false, showAnimatedToken44: false,
      turn1: true, turn2: false, turn3: false, turn4: false, currentNumber: 0, turnMessage: "", moveMessage: "", whoseTurnToMove: 0,
      isMovedBy1: false, isMovedBy2: false, isMovedBy3: false, isMovedBy4: false,
      image1: require("../assets/dice1.png"), image2: require("../assets/dice1.png"), image3: require("../assets/dice1.png"), image4: require("../assets/dice1.png"),
      noOfPlayer: props.route.params.noOfPlayer,
      showDiceroll1: false,
      showDiceroll2: false,
      showDiceroll3: false,
      showDiceroll4: false,
      isBlinking: true,
      winCountForOne: 0, winCountForTwo: 0, winCountForThree: 0, winCountForFour: 0,
      winners: [],
      showWinPage: false,
      whoWon: -1
    }
    this.opacity = new Animated.Value(1);
    this.blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(this.opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(this.opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    );
  }
  moveIcon = (player, whichOne, position) => {
    // console.log(this.state.winCountForOne, "*****************************")
    switch (player) {
      case 1:
        if (this.state.whoseTurnToMove == 1 && (!this.state.isMovedBy1)) {
          switch (whichOne) {
            case 1:
              if (this.state.position11 < 0) {
                if (this.state.currentNumber == 6) {
                  //this.blinkAnimation.start();
                  this.setState({ position11: 1 })

                  this.setState({ isMovedBy1: true })
                  this.setState({ turn1: true })
                  // this.blinkAnimation.stop();
                } else {
                  this.setState({ moveMessage: "" })
                }
              } else if (this.state.position11 !== 58) {
                var currentPosition = this.state.position11;
                if (currentPosition == 51) currentPosition = 52;
                var nextPosition = this.state.currentNumber + currentPosition;
                if (nextPosition > 57) {
                  if (nextPosition == 58) {
                    this.setState({ position11: 58 })
                    this.setState((prevState) => ({ winCountForOne: prevState.winCountForOne + 1 }), () => {
                      if (this.state.winCountForOne === 4) {
                        this.setState({ isMovedBy1: true }, () => {
                          this.setState({ turn1: false });
                          if (this.state.noOfPlayer === 2) this.setState({ turn3: true });
                          else this.setState({ turn2: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player1"],
                        }));
                        this.setState({ isMovedBy1: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn2: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn3: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 1 });
                            this.setState({ showWinPage: true });
                          });
                        });

                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy1: false }); this.setState({ whoseTurnToMove: 1 });
                        this.setState({ turn1: true }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        } else if (this.state.noOfPlayer > 2 && !this.checkIfAnythingOpened(4)) {
                          this.setState({ isMovedBy4: true })
                        }
                      }
                    });
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  // To be Understand
                  // if (this.state.position11 >= 46 && this.state.position11 <= 51) {
                  //   if (nextPosition >= 52) {
                  //     nextPosition += 1
                  //     console.log("in if")
                  //   }
                  // }
                  let for2 = this.checkIfCutPossibleFor2(nextPosition);
                  let for3 = this.checkIfCutPossibleFor3(nextPosition);
                  let for4 = this.checkIfCutPossibleFor4(nextPosition)
                  this.setState({ position11: nextPosition });
                  if (for2 === true || for3 === true || for4 === true) {
                    this.setState({ isMovedBy1: false }); this.setState({ whoseTurnToMove: 1 });
                    this.setState({ turn1: true }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: false });
                    if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(3)) {
                      this.setState({ isMovedBy3: true })
                    } else if (this.state.noOfPlayer > 2 && !this.checkIfAnythingOpened(4)) {
                      this.setState({ isMovedBy4: true })
                    }
                  } else {
                    this.setState({ isMovedBy1: true })
                    if (this.state.currentNumber === 6) this.setState({ turn1: true })
                  }
                }
              }
              break;
            case 2:
              if (this.state.position12 < 0) {
                if (this.state.currentNumber == 6) {
                  this.setState({ position12: 1 });
                  this.setState({ isMovedBy1: true })
                  this.setState({ turn1: true })
                } else {
                  this.setState({ moveMessage: "" })
                }
              } else if (this.state.position12 !== 58) {
                var currentPosition = this.state.position12;
                if (currentPosition == 51) currentPosition = 52;
                var nextPosition = this.state.currentNumber + currentPosition;
                if (nextPosition > 57) {
                  if (nextPosition == 58) {
                    this.setState({ position12: 58 })
                    this.setState((prevState) => ({ winCountForOne: prevState.winCountForOne + 1 }), () => {
                      if (this.state.winCountForOne === 4) {
                        this.setState({ isMovedBy1: true }, () => {
                          this.setState({ turn1: false });
                          if (this.state.noOfPlayer === 2) this.setState({ turn3: true });
                          else this.setState({ turn2: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player1"],
                        }));
                        this.setState({ isMovedBy1: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn2: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn3: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 1 });
                            this.setState({ showWinPage: true });
                          });
                        });

                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy1: false }); this.setState({ whoseTurnToMove: 1 });
                        this.setState({ turn1: true }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        } else if (this.state.noOfPlayer > 2 && !this.checkIfAnythingOpened(4)) {
                          this.setState({ isMovedBy4: true })
                        }
                      }
                    });

                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  if (this.state.position12 >= 46 && this.state.position12 <= 51) {
                    if (nextPosition >= 52) {
                      nextPosition += 1
                    }
                  }
                  let for2 = this.checkIfCutPossibleFor2(nextPosition);
                  let for3 = this.checkIfCutPossibleFor3(nextPosition);
                  let for4 = this.checkIfCutPossibleFor4(nextPosition)
                  this.setState({ position12: nextPosition })
                  if (for2 === true || for3 === true || for4 === true) {
                    this.setState({ isMovedBy1: false }); this.setState({ whoseTurnToMove: 1 });
                    this.setState({ turn1: true }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: false });
                    if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(3)) {
                      this.setState({ isMovedBy3: true })
                    } else if (this.state.noOfPlayer > 2 && !this.checkIfAnythingOpened(4)) {
                      this.setState({ isMovedBy4: true })
                    }
                  } else {
                    this.setState({ isMovedBy1: true })
                    if (this.state.currentNumber === 6) this.setState({ turn1: true })
                  }
                }
              }
              break;
            case 3:
              if (this.state.position13 < 0) {
                if (this.state.currentNumber == 6) {
                  this.setState({ position13: 1 })
                  this.setState({ isMovedBy1: true })
                  this.setState({ turn1: true })
                } else {
                  this.setState({ moveMessage: "" })
                }
              } else if (this.state.position13 !== 58) {
                var currentPosition = this.state.position13;
                if (currentPosition == 51) currentPosition = 52;
                var nextPosition = this.state.currentNumber + currentPosition;
                if (nextPosition > 57) {
                  if (nextPosition == 58) {
                    this.setState({ position13: 58 })
                    this.setState((prevState) => ({ winCountForOne: prevState.winCountForOne + 1 }), () => {
                      if (this.state.winCountForOne === 4) {
                        this.setState({ isMovedBy1: true }, () => {
                          this.setState({ turn1: false });
                          if (this.state.noOfPlayer === 2) this.setState({ turn3: true });
                          else this.setState({ turn2: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player1"],
                        }));
                        this.setState({ isMovedBy1: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn2: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn3: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 1 });
                            this.setState({ showWinPage: true });
                          });
                        });

                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy1: false }); this.setState({ whoseTurnToMove: 1 });
                        this.setState({ turn1: true }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        } else if (this.state.noOfPlayer > 2 && !this.checkIfAnythingOpened(4)) {
                          this.setState({ isMovedBy4: true })
                        }
                      }
                    });

                  } else {
                    this.setState({ moveMessage: "" });
                  }
                } else {
                  if (this.state.position13 >= 46 && this.state.position13 <= 51) {
                    if (nextPosition >= 52) {
                      nextPosition += 1
                    }
                  }
                  let for2 = this.checkIfCutPossibleFor2(nextPosition);
                  let for3 = this.checkIfCutPossibleFor3(nextPosition);
                  let for4 = this.checkIfCutPossibleFor4(nextPosition)
                  this.setState({ position13: nextPosition })
                  if (for2 === true || for3 === true || for4 === true) {
                    this.setState({ isMovedBy1: false }); this.setState({ whoseTurnToMove: 1 });
                    this.setState({ turn1: true }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: false });
                    if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(3)) {
                      this.setState({ isMovedBy3: true })
                    } else if (this.state.noOfPlayer > 2 && !this.checkIfAnythingOpened(4)) {
                      this.setState({ isMovedBy4: true })
                    }
                  } else {
                    this.setState({ isMovedBy1: true })
                    if (this.state.currentNumber === 6) this.setState({ turn1: true })
                  }
                }
              }
              break;
            case 4:
              if (this.state.position14 < 0) {
                if (this.state.currentNumber == 6) {
                  this.setState({ position14: 1 })
                  this.setState({ isMovedBy1: true })
                  this.setState({ turn1: true })
                } else {
                  this.setState({ moveMessage: "" })
                }
              } else if (this.state.position14 !== 58) {
                var currentPosition = this.state.position14;
                if (currentPosition == 51) currentPosition = 52;
                var nextPosition = this.state.currentNumber + currentPosition;
                if (nextPosition > 57) {
                  if (nextPosition == 58) {
                    this.setState({ position14: 58 })
                    this.setState((prevState) => ({ winCountForOne: prevState.winCountForOne + 1 }), () => {
                      if (this.state.winCountForOne === 4) {
                        this.setState({ isMovedBy1: true }, () => {
                          this.setState({ turn1: false });
                          if (this.state.noOfPlayer === 2) this.setState({ turn3: true });
                          else this.setState({ turn2: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player1"],
                        }));
                        this.setState({ isMovedBy1: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn2: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn3: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 1 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy1: false }); this.setState({ whoseTurnToMove: 1 });
                        this.setState({ turn1: true }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        } else if (this.state.noOfPlayer > 2 && !this.checkIfAnythingOpened(4)) {
                          this.setState({ isMovedBy4: true })
                        }
                      }
                    });

                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  if (this.state.position14 >= 46 && this.state.position14 <= 51) {
                    if (nextPosition >= 52) {
                      nextPosition += 1
                    }
                  }
                  let for2 = this.checkIfCutPossibleFor2(nextPosition);
                  let for3 = this.checkIfCutPossibleFor3(nextPosition);
                  let for4 = this.checkIfCutPossibleFor4(nextPosition)
                  this.setState({ position14: nextPosition })
                  if (for2 === true || for3 === true || for4 === true) {
                    this.setState({ isMovedBy1: false }); this.setState({ whoseTurnToMove: 1 });
                    this.setState({ turn1: true }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: false });
                    if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(3)) {
                      this.setState({ isMovedBy3: true })
                    } else if (this.state.noOfPlayer > 2 && !this.checkIfAnythingOpened(4)) {
                      this.setState({ isMovedBy4: true })
                    }
                  } else {
                    this.setState({ isMovedBy1: true })
                    if (this.state.currentNumber === 6) this.setState({ turn1: true })
                  }
                }
              }
              break;
          }
        } else {
          this.setState({ moveMessage: "" })
        }
        break;
      case 2:
        if (this.state.whoseTurnToMove == 2 && (!this.state.isMovedBy2)) {
          switch (whichOne) {
            case 1:
              if (this.state.position21 != 64) {
                if (this.state.position21 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position21: 14 })
                    this.setState({ isMovedBy2: true })
                    if (this.state.currentNumber === 6) this.setState({ turn2: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position21;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition < 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for3 = this.checkIfCutPossibleFor3(extraMoves);
                    let for4 = this.checkIfCutPossibleFor4(extraMoves);
                    this.setState({ position21: extraMoves })
                    if (for1 === true || for3 === true || for4 === true) {
                      this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                      this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                      if (!this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      }
                    } else this.setState({ isMovedBy2: true })
                  } else if (this.state.position21 >= 7 && this.state.position21 <= 12) {
                    if (nextPosition > 12) {
                      extraMoves = nextPosition - 12
                      newPosition = 58 + extraMoves
                      if (this.state.position21 == 12 && this.state.currentNumber == 6) {
                        this.setState({ position21: 64 })
                        this.setState((prevState) => ({ winCountForTwo: prevState.winCountForTwo + 1 }));
                        if (this.state.winCountForTwo === 4) {
                          this.setState({ isMovedBy2: true }, () => {
                            this.setState({ turn2: false });
                            if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                            else this.setState({ turn4: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player2"],
                          }));
                          this.setState({ isMovedBy2: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 2 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                          this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                          if (!this.checkIfAnythingOpened(1)) {
                            this.setState({ isMovedBy1: true })
                          }
                        }
                        // this.setState({ isMovedBy2: true })
                      } else {
                        this.setState({ position21: newPosition })
                        this.setState({ isMovedBy2: true })
                        if (this.state.currentNumber === 6) this.setState({ turn2: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for3 = this.checkIfCutPossibleFor3(nextPosition);
                      let for4 = this.checkIfCutPossibleFor4(nextPosition)
                      this.setState({ position21: nextPosition })
                      if (for1 === true || for3 === true || for4 === true) {
                        this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                        this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (!this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        }
                      } else {
                        this.setState({ isMovedBy2: true })
                        if (this.state.currentNumber === 6) this.setState({ turn2: true })
                      }
                    }
                  } else if (this.state.position21 >= 59 && this.state.position21 <= 63) {
                    nextPosition = this.state.position21 + this.state.currentNumber
                    if (nextPosition == 64) {
                      this.setState({ position21: 64 })
                      this.setState((prevState) => ({ winCountForTwo: prevState.winCountForTwo + 1 }));
                      if (this.state.winCountForTwo === 4) {
                        this.setState({ isMovedBy2: true }, () => {
                          this.setState({ turn2: false });
                          if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                          else this.setState({ turn4: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player2"],
                        }));
                        this.setState({ isMovedBy2: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 2 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                        this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (!this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        }
                      }
                    } else if (nextPosition > 64) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position21: nextPosition })
                      this.setState({ isMovedBy2: true })
                      if (this.state.currentNumber === 6) this.setState({ turn2: true })
                    }
                  }
                  else {
                    nextPosition = this.state.position21 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for3 = this.checkIfCutPossibleFor3(nextPosition);
                    let for4 = this.checkIfCutPossibleFor4(nextPosition)
                    this.setState({ position21: nextPosition })
                    if (for1 === true || for3 === true || for4 === true) {
                      this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                      this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                      if (!this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      }
                    } else {
                      this.setState({ isMovedBy2: true })
                      if (this.state.currentNumber === 6) this.setState({ turn2: true })
                    }
                  }
                }
              }
              break;
            case 2:
              if (this.state.position22 != 64) {
                if (this.state.position22 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position22: 14 })
                    this.setState({ isMovedBy2: true })
                    this.setState({ turn2: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position22;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition < 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for3 = this.checkIfCutPossibleFor3(extraMoves);
                    let for4 = this.checkIfCutPossibleFor4(extraMoves)
                    this.setState({ position22: extraMoves })
                    if (for1 === true || for3 === true || for4 === true) {
                      this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                      this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                      if (!this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      }
                    } else {
                      this.setState({ isMovedBy2: true })
                      if (this.state.currentNumber === 6) this.setState({ turn2: true })
                    }
                  } else if (this.state.position22 >= 7 && this.state.position22 <= 12) {
                    if (nextPosition > 12) {
                      extraMoves = nextPosition - 12
                      newPosition = 58 + extraMoves
                      if (this.state.position22 == 12 && this.state.currentNumber == 6) {
                        this.setState({ position22: 64 })
                        this.setState((prevState) => ({ winCountForTwo: prevState.winCountForTwo + 1 }));
                        if (this.state.winCountForTwo === 4) {
                          this.setState({ isMovedBy2: true }, () => {
                            this.setState({ turn2: false });
                            if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                            else this.setState({ turn4: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player2"],
                          }));
                          this.setState({ isMovedBy2: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 2 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                          this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                          if (!this.checkIfAnythingOpened(1)) {
                            this.setState({ isMovedBy1: true })
                          }
                        }
                        // this.setState({ isMovedBy2: true })
                      } else {
                        this.setState({ position22: newPosition })
                        this.setState({ isMovedBy2: true })
                        if (this.state.currentNumber === 6) this.setState({ turn2: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for3 = this.checkIfCutPossibleFor3(nextPosition);
                      let for4 = this.checkIfCutPossibleFor4(nextPosition)
                      this.setState({ position22: nextPosition })
                      if (for1 === true || for3 === true || for4 === true) {
                        this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                        this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (!this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        }
                      } else {
                        this.setState({ isMovedBy2: true })
                        if (this.state.currentNumber === 6) this.setState({ turn2: true })
                      }
                    }
                  } else if (this.state.position22 >= 59 && this.state.position22 <= 63) {
                    nextPosition = this.state.position22 + this.state.currentNumber
                    if (nextPosition == 64) {
                      this.setState({ position22: 64 })
                      this.setState((prevState) => ({ winCountForTwo: prevState.winCountForTwo + 1 }));
                      if (this.state.winCountForTwo === 4) {
                        this.setState({ isMovedBy2: true }, () => {
                          this.setState({ turn2: false });
                          if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                          else this.setState({ turn4: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player2"],
                        }));
                        this.setState({ isMovedBy2: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 2 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      // this.setState({ isMovedBy2: true })
                      else {
                        this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                        this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (!this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        }
                      }
                    } else if (nextPosition > 64) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position22: nextPosition })
                      this.setState({ isMovedBy2: true })
                      if (this.state.currentNumber === 6) this.setState({ turn2: true })
                    }
                  }
                  else {
                    nextPosition = this.state.position22 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for3 = this.checkIfCutPossibleFor3(nextPosition);
                    let for4 = this.checkIfCutPossibleFor4(nextPosition)
                    this.setState({ position22: nextPosition })
                    if (for1 === true || for3 === true || for4 === true) {
                      this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                      this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                      if (!this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      }
                    } else {
                      this.setState({ isMovedBy2: true })
                      if (this.state.currentNumber === 6) this.setState({ turn2: true })
                    }
                  }
                }
              }
              break;
            case 3:
              if (this.state.position23 != 64) {
                if (this.state.position23 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position23: 14 })
                    this.setState({ isMovedBy2: true })
                    this.setState({ turn2: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position23;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition < 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for3 = this.checkIfCutPossibleFor3(extraMoves);
                    let for4 = this.checkIfCutPossibleFor4(extraMoves)
                    this.setState({ position23: extraMoves })
                    if (for1 === true || for3 === true || for4 === true) {
                      this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                      this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                      if (!this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      }
                    } else {
                      this.setState({ isMovedBy2: true })
                      if (this.state.currentNumber === 6) this.setState({ turn2: true })
                    }
                  } else if (this.state.position23 >= 7 && this.state.position23 <= 12) {
                    if (nextPosition > 12) {
                      extraMoves = nextPosition - 12
                      newPosition = 58 + extraMoves
                      if (this.state.position23 == 12 && this.state.currentNumber == 6) {
                        this.setState({ position23: 64 })
                        this.setState((prevState) => ({ winCountForTwo: prevState.winCountForTwo + 1 }));
                        if (this.state.winCountForTwo === 4) {
                          this.setState({ isMovedBy2: true }, () => {
                            this.setState({ turn2: false });
                            if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                            else this.setState({ turn4: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player2"],
                          }));
                          this.setState({ isMovedBy2: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 2 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                          this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                          if (!this.checkIfAnythingOpened(1)) {
                            this.setState({ isMovedBy1: true })
                          }
                        }
                        // this.setState({ isMovedBy2: true })
                      } else {
                        this.setState({ position23: newPosition })
                        this.setState({ isMovedBy2: true })
                        if (this.state.currentNumber === 6) this.setState({ turn2: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for3 = this.checkIfCutPossibleFor3(nextPosition);
                      let for4 = this.checkIfCutPossibleFor4(nextPosition)
                      this.setState({ position23: nextPosition })
                      if (for1 === true || for3 === true || for4 === true) {
                        this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                        this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (!this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        }
                      } else {
                        this.setState({ isMovedBy2: true })
                        if (this.state.currentNumber === 6) this.setState({ turn2: true })
                      }
                    }
                  } else if (this.state.position23 >= 59 && this.state.position23 <= 63) {
                    nextPosition = this.state.position23 + this.state.currentNumber
                    if (nextPosition == 64) {
                      this.setState({ position23: 64 })
                      this.setState((prevState) => ({ winCountForTwo: prevState.winCountForTwo + 1 }));
                      if (this.state.winCountForTwo === 4) {
                        this.setState({ isMovedBy2: true }, () => {
                          this.setState({ turn2: false });
                          if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                          else this.setState({ turn4: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player2"],
                        }));
                        this.setState({ isMovedBy2: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 2 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                        this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (!this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        }
                      }
                      // this.setState({ isMovedBy2: true })
                    } else if (nextPosition > 64) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position23: nextPosition })
                      this.setState({ isMovedBy2: true })
                      if (this.state.currentNumber === 6) this.setState({ turn2: true })
                    }
                  }
                  else {
                    nextPosition = this.state.position23 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for3 = this.checkIfCutPossibleFor3(nextPosition);
                    let for4 = this.checkIfCutPossibleFor4(nextPosition)
                    this.setState({ position23: nextPosition })
                    if (for1 === true || for3 === true || for4 === true) {
                      this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                      this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                      if (!this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      }
                    } else {
                      this.setState({ isMovedBy2: true })
                      if (this.state.currentNumber === 6) this.setState({ turn2: true })
                    }
                  }
                }
              }
              break;
            case 4:
              if (this.state.position24 != 64) {
                if (this.state.position24 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position24: 14 })
                    this.setState({ isMovedBy2: true })
                    if (this.state.currentNumber === 6) this.setState({ turn2: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position24;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition < 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for3 = this.checkIfCutPossibleFor3(extraMoves);
                    let for4 = this.checkIfCutPossibleFor4(extraMoves)
                    this.setState({ position24: extraMoves })
                    if (for1 === true || for3 === true || for4 === true) {
                      this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                      this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                      if (!this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      }
                    } else {
                      this.setState({ isMovedBy2: true })
                      if (this.state.currentNumber === 6) this.setState({ turn2: true })
                    }
                  } else if (this.state.position24 >= 7 && this.state.position24 <= 12) {
                    if (nextPosition > 12) {
                      extraMoves = nextPosition - 12
                      newPosition = 58 + extraMoves
                      if (this.state.position24 == 12 && this.state.currentNumber == 6) {
                        this.setState({ position24: 64 })
                        this.setState((prevState) => ({ winCountForTwo: prevState.winCountForTwo + 1 }));
                        if (this.state.winCountForTwo === 4) {
                          this.setState({ isMovedBy2: true }, () => {
                            this.setState({ turn2: false });
                            if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                            else this.setState({ turn4: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player2"],
                          }));
                          this.setState({ isMovedBy2: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 2 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                          this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                          if (!this.checkIfAnythingOpened(1)) {
                            this.setState({ isMovedBy1: true })
                          }
                        }
                        // this.setState({ isMovedBy2: true })
                      } else {
                        this.setState({ position24: newPosition })
                        this.setState({ isMovedBy2: true })
                        if (this.state.currentNumber === 6) this.setState({ turn2: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for3 = this.checkIfCutPossibleFor3(nextPosition);
                      let for4 = this.checkIfCutPossibleFor4(nextPosition)
                      this.setState({ position24: nextPosition })
                      if (for1 === true || for3 === true || for4 === true) {
                        this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                        this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (!this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        }
                      } else {
                        this.setState({ isMovedBy2: true })
                        if (this.state.currentNumber === 6) this.setState({ turn2: true })
                      }
                    }
                  } else if (this.state.position24 >= 59 && this.state.position24 <= 63) {
                    nextPosition = this.state.position24 + this.state.currentNumber
                    if (nextPosition == 64) {
                      this.setState({ position24: 64 })
                      this.setState((prevState) => ({ winCountForTwo: prevState.winCountForTwo + 1 }));
                      if (this.state.winCountForTwo === 4) {
                        this.setState({ isMovedBy2: true }, () => {
                          this.setState({ turn2: false });
                          if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                          else this.setState({ turn4: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player2"],
                        }));
                        this.setState({ isMovedBy2: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 2 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                        this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                        if (!this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        }
                      }
                      // this.setState({ isMovedBy2: true })
                    } else if (nextPosition > 64) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position24: nextPosition })
                      {
                        this.setState({ isMovedBy2: true })
                        if (this.state.currentNumber === 6) this.setState({ turn2: true })
                      }
                    }
                  }
                  else {
                    nextPosition = this.state.position24 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for3 = this.checkIfCutPossibleFor3(nextPosition);
                    let for4 = this.checkIfCutPossibleFor4(nextPosition)
                    this.setState({ position24: nextPosition })
                    if (for1 === true || for3 === true || for4 === true) {
                      this.setState({ isMovedBy2: false }); this.setState({ whoseTurnToMove: 2 });
                      this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ turn3: false }); this.setState({ turn4: false });
                      if (!this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      }
                    } else {
                      this.setState({ isMovedBy2: true })
                      if (this.state.currentNumber === 6) this.setState({ turn2: true })
                    }
                  }
                }
              }
              break;
          }
        } else {
          this.setState({ moveMessage: "" })
        }
        break;
      case 3:
        if (this.state.whoseTurnToMove == 3 && (!this.state.isMovedBy3)) {
          switch (whichOne) {
            case 1:
              if (this.state.position31 != 70) {
                if (this.state.position31 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position31: 27 })
                    this.setState({ isMovedBy3: true })
                    this.setState({ turn3: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position31;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition < 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for2 = this.checkIfCutPossibleFor2(extraMoves);
                    let for4 = this.checkIfCutPossibleFor4(extraMoves)
                    this.setState({ position31: extraMoves })
                    if (for1 === true || for2 === true || for4 === true) {
                      this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                      if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      }
                    } else {
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  } else if (this.state.position31 >= 20 && this.state.position31 <= 25) {
                    if (nextPosition > 25) {
                      extraMoves = nextPosition - 25
                      newPosition = 64 + extraMoves
                      if (this.state.position31 == 25 && this.state.currentNumber == 6) {
                        this.setState({ position31: 70 })
                        this.setState((prevState) => ({ winCountForThree: prevState.winCountForThree + 1 }));
                        if (this.state.winCountForThree === 4) {
                          this.setState({ isMovedBy3: true }, () => {
                            this.setState({ turn3: false });
                            if (this.state.noOfPlayer === 2) this.setState({ turn1: true });
                            else this.setState({ turn4: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player3"],
                          }));
                          this.setState({ isMovedBy3: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 3 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }

                        else {
                          this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                          this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                          if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                            this.setState({ isMovedBy1: true })
                          } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                            this.setState({ isMovedBy2: true })
                          }
                        }
                        // this.setState({ isMovedBy3: true })
                      }
                      else {
                        this.setState({ position31: newPosition })
                        this.setState({ isMovedBy3: true })
                        if (this.state.currentNumber === 6) this.setState({ turn3: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for2 = this.checkIfCutPossibleFor2(nextPosition);
                      let for4 = this.checkIfCutPossibleFor4(nextPosition)
                      this.setState({ position31: nextPosition })
                      if (for1 === true || for2 === true || for4 === true) {
                        this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        }
                      } else {
                        this.setState({ isMovedBy3: true })
                        if (this.state.currentNumber === 6) this.setState({ turn3: true })
                      }
                    }
                  } else if (this.state.position31 >= 65 && this.state.position31 <= 69) {
                    nextPosition = this.state.position31 + this.state.currentNumber
                    if (nextPosition == 70) {
                      this.setState({ position31: 70 })
                      this.setState((prevState) => ({ winCountForThree: prevState.winCountForThree + 1 }));
                      if (this.state.winCountForThree === 4) {
                        this.setState({ isMovedBy3: true }, () => {
                          this.setState({ turn3: false });
                          if (this.state.noOfPlayer === 2) this.setState({ turn1: true });
                          else this.setState({ turn4: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player3"],
                        }));
                        this.setState({ isMovedBy3: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 3 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        }
                      }
                      // this.setState({ isMovedBy3: true })
                    } else if (nextPosition > 70) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position31: nextPosition })
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  }
                  else {
                    nextPosition = this.state.position31 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for2 = this.checkIfCutPossibleFor2(nextPosition);
                    let for4 = this.checkIfCutPossibleFor4(nextPosition)
                    this.setState({ position31: nextPosition })
                    if (for1 === true || for2 === true || for4 === true) {
                      this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                      if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      }
                    } else {
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  }
                }
              }
              break;
            case 2:
              if (this.state.position32 != 70) {
                if (this.state.position32 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position32: 27 })
                    this.setState({ isMovedBy3: true })
                    this.setState({ turn3: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position32;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition < 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for2 = this.checkIfCutPossibleFor2(extraMoves);
                    let for4 = this.checkIfCutPossibleFor4(extraMoves)
                    this.setState({ position32: extraMoves })
                    if (for1 === true || for2 === true || for4 === true) {
                      this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                      if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      }
                    } else {
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  } else if (this.state.position32 >= 20 && this.state.position32 <= 25) {
                    if (nextPosition > 25) {
                      extraMoves = nextPosition - 25
                      newPosition = 64 + extraMoves
                      if (this.state.position32 == 25 && this.state.currentNumber == 6) {
                        this.setState({ position32: 70 })
                        this.setState((prevState) => ({ winCountForThree: prevState.winCountForThree + 1 }));
                        if (this.state.winCountForThree === 4) {
                          this.setState({ isMovedBy3: true }, () => {
                            this.setState({ turn3: false });
                            if (this.state.noOfPlayer === 2) this.setState({ turn1: true });
                            else this.setState({ turn4: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player3"],
                          }));
                          this.setState({ isMovedBy3: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 3 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                          this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                          if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                            this.setState({ isMovedBy1: true })
                          } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                            this.setState({ isMovedBy2: true })
                          }
                        }
                        // this.setState({ isMovedBy3: true })
                      } else {
                        this.setState({ position32: newPosition })
                        this.setState({ isMovedBy3: true })
                        if (this.state.currentNumber === 6) this.setState({ turn3: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for2 = this.checkIfCutPossibleFor2(nextPosition);
                      let for4 = this.checkIfCutPossibleFor4(nextPosition)
                      this.setState({ position32: nextPosition })
                      if (for1 === true || for2 === true || for4 === true) {
                        this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        }
                      } else {
                        this.setState({ isMovedBy3: true })
                        if (this.state.currentNumber === 6) this.setState({ turn3: true })
                      }
                    }
                  } else if (this.state.position32 >= 65 && this.state.position32 <= 69) {
                    nextPosition = this.state.position32 + this.state.currentNumber
                    if (nextPosition == 70) {
                      this.setState({ position32: 70 })
                      this.setState((prevState) => ({ winCountForThree: prevState.winCountForThree + 1 }));
                      if (this.state.winCountForThree === 4) {
                        this.setState({ isMovedBy3: true }, () => {
                          this.setState({ turn3: false });
                          if (this.state.noOfPlayer === 2) this.setState({ turn1: true });
                          else this.setState({ turn4: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player3"],
                        }));
                        this.setState({ isMovedBy3: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 3 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        }
                      }
                      // this.setState({ isMovedBy3: true })
                    } else if (nextPosition > 70) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position32: nextPosition })
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  }
                  else {
                    nextPosition = this.state.position32 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for2 = this.checkIfCutPossibleFor2(nextPosition);
                    let for4 = this.checkIfCutPossibleFor4(nextPosition)
                    this.setState({ position32: nextPosition })
                    if (for1 === true || for2 === true || for4 === true) {
                      this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                      if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      }
                    } else {
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  }
                }
              }
              break;
            case 3:
              if (this.state.position33 != 70) {
                if (this.state.position33 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position33: 27 })
                    this.setState({ isMovedBy3: true })
                    this.setState({ turn3: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position33;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition < 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for2 = this.checkIfCutPossibleFor2(extraMoves);
                    let for4 = this.checkIfCutPossibleFor4(extraMoves)
                    this.setState({ position33: extraMoves })
                    if (for1 === true || for2 === true || for4 === true) {
                      this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                      if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      }
                    } else {
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  } else if (this.state.position33 >= 20 && this.state.position33 <= 25) {
                    if (nextPosition > 25) {
                      extraMoves = nextPosition - 25
                      newPosition = 64 + extraMoves
                      if (this.state.position33 == 25 && this.state.currentNumber == 6) {
                        this.setState({ position33: 70 })
                        this.setState((prevState) => ({ winCountForThree: prevState.winCountForThree + 1 }));
                        if (this.state.winCountForThree === 4) {
                          this.setState({ isMovedBy3: true }, () => {
                            this.setState({ turn3: false });
                            if (this.state.noOfPlayer === 2) this.setState({ turn1: true });
                            else this.setState({ turn4: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player3"],
                          }));
                          this.setState({ isMovedBy3: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 3 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                          this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                          if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                            this.setState({ isMovedBy1: true })
                          } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                            this.setState({ isMovedBy2: true })
                          }
                        }
                        // this.setState({ isMovedBy3: true })
                      }
                      else {
                        this.setState({ position33: newPosition })
                        this.setState({ isMovedBy3: true })
                        if (this.state.currentNumber === 6) this.setState({ turn3: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for2 = this.checkIfCutPossibleFor2(nextPosition);
                      let for4 = this.checkIfCutPossibleFor4(nextPosition)
                      this.setState({ position33: nextPosition })
                      if (for1 === true || for2 === true || for4 === true) {
                        this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        }
                      } else {
                        this.setState({ isMovedBy3: true })
                        if (this.state.currentNumber === 6) this.setState({ turn3: true })
                      }
                    }
                  } else if (this.state.position33 >= 65 && this.state.position33 <= 69) {
                    nextPosition = this.state.position33 + this.state.currentNumber
                    if (nextPosition == 70) {
                      this.setState({ position33: 70 })
                      this.setState((prevState) => ({ winCountForThree: prevState.winCountForThree + 1 }));
                      if (this.state.winCountForThree === 4) {
                        this.setState({ isMovedBy3: true }, () => {
                          this.setState({ turn3: false });
                          if (this.state.noOfPlayer === 2) this.setState({ turn1: true });
                          else this.setState({ turn4: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player3"],
                        }));
                        this.setState({ isMovedBy3: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 3 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        }
                      }
                      // this.setState({ isMovedBy3: true })
                    } else if (nextPosition > 70) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position33: nextPosition })
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  }
                  else {
                    nextPosition = this.state.position33 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for2 = this.checkIfCutPossibleFor2(nextPosition);
                    let for4 = this.checkIfCutPossibleFor4(nextPosition)
                    this.setState({ position33: nextPosition })
                    if (for1 === true || for2 === true || for4 === true) {
                      this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                      if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      }
                    } else {
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  }
                }
              }
              break;
            case 4:
              if (this.state.position34 != 70) {
                if (this.state.position34 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position34: 27 })
                    this.setState({ isMovedBy3: true })
                    this.setState({ turn3: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position34;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition < 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for2 = this.checkIfCutPossibleFor2(extraMoves);
                    let for4 = this.checkIfCutPossibleFor4(extraMoves)
                    this.setState({ position34: extraMoves })
                    if (for1 === true || for2 === true || for4 === true) {
                      this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                      if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      }
                    } else {
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  } else if (this.state.position34 >= 20 && this.state.position34 <= 25) {
                    if (nextPosition > 25) {
                      extraMoves = nextPosition - 25
                      newPosition = 64 + extraMoves
                      if (this.state.position34 == 25 && this.state.currentNumber == 6) {
                        this.setState({ position34: 70 })
                        this.setState((prevState) => ({ winCountForThree: prevState.winCountForThree + 1 }));
                        if (this.state.winCountForThree === 4) {
                          this.setState({ isMovedBy3: true }, () => {
                            this.setState({ turn3: false });
                            if (this.state.noOfPlayer === 2) this.setState({ turn1: true });
                            else this.setState({ turn4: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player3"],
                          }));
                          this.setState({ isMovedBy3: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 3 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                          this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                          if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                            this.setState({ isMovedBy1: true })
                          } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                            this.setState({ isMovedBy2: true })
                          }
                        }
                        // this.setState({ isMovedBy3: true })
                      }
                      else {
                        this.setState({ position34: newPosition })
                        this.setState({ isMovedBy3: true })
                        if (this.state.currentNumber === 6) this.setState({ turn3: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for2 = this.checkIfCutPossibleFor2(nextPosition);
                      let for4 = this.checkIfCutPossibleFor4(nextPosition)
                      this.setState({ position34: nextPosition })
                      if (for1 === true || for2 === true || for4 === true) {
                        this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        }
                      } else {
                        this.setState({ isMovedBy3: true })
                        if (this.state.currentNumber === 6) this.setState({ turn3: true })
                      }
                    }
                  } else if (this.state.position34 >= 65 && this.state.position34 <= 69) {
                    nextPosition = this.state.position34 + this.state.currentNumber
                    if (nextPosition == 70) {
                      this.setState({ position34: 70 })
                      this.setState((prevState) => ({ winCountForThree: prevState.winCountForThree + 1 }));
                      if (this.state.winCountForThree === 4) {
                        this.setState({ isMovedBy3: true }, () => {
                          this.setState({ turn3: false });
                          if (this.state.noOfPlayer === 2) this.setState({ turn1: true });
                          else this.setState({ turn4: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player3"],
                        }));
                        this.setState({ isMovedBy3: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 3 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                        if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                          this.setState({ isMovedBy1: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        }
                      }
                      // this.setState({ isMovedBy3: true })
                    } else if (nextPosition > 70) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position34: nextPosition })
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  }
                  else {
                    nextPosition = this.state.position34 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for2 = this.checkIfCutPossibleFor2(nextPosition);
                    let for4 = this.checkIfCutPossibleFor4(nextPosition)

                    this.setState({ position34: nextPosition })
                    if (for1 === true || for2 === true || for4 === true) {
                      this.setState({ isMovedBy3: false }); this.setState({ whoseTurnToMove: 3 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ turn4: false });
                      if (this.state.noOfPlayer === 2 && !this.checkIfAnythingOpened(1)) {
                        this.setState({ isMovedBy1: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      }
                    } else {
                      this.setState({ isMovedBy3: true })
                      if (this.state.currentNumber === 6) this.setState({ turn3: true })
                    }
                  }
                }
              }
              break;
          }
        } else {
          this.setState({ moveMessage: "" })
        }
        break;
      case 4:
        if (this.state.whoseTurnToMove == 4 && (!this.state.isMovedBy4)) {
          switch (whichOne) {
            case 1:
              if (this.state.position41 != 76) {
                if (this.state.position41 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position41: 40 })
                    this.setState({ isMovedBy4: true })
                    this.setState({ turn4: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position41;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition <= 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for2 = this.checkIfCutPossibleFor2(extraMoves);
                    let for3 = this.checkIfCutPossibleFor3(extraMoves)
                    this.setState({ position41: extraMoves })
                    if (for1 === true || for2 === true || for3 === true) {
                      this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                      if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                        this.setState({ isMovedBy3: true })
                      }
                    } else {
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }
                  } else if (this.state.position41 >= 33 && this.state.position41 <= 38) {
                    if (nextPosition > 38) {
                      extraMoves = nextPosition - 38
                      newPosition = 70 + extraMoves
                      if (this.state.position41 == 38 && this.state.currentNumber == 6) {
                        this.setState({ position41: 76 })
                        this.setState((prevState) => ({ winCountForFour: prevState.winCountForFour + 1 }));
                        if (this.state.winCountForFour === 4) {
                          this.setState({ isMovedBy4: true }, () => {
                            this.setState({ turn4: false });
                            this.setState({ turn1: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player4"],
                          }));
                          this.setState({ isMovedBy4: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 4 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                          this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                          if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                            this.setState({ isMovedBy2: true })
                          } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                            this.setState({ isMovedBy3: true })
                          }
                        }
                        // this.setState({ isMovedBy4: true })
                      }
                      else {
                        this.setState({ position41: newPosition })
                        this.setState({ isMovedBy4: true })
                        if (this.state.currentNumber === 6) this.setState({ turn4: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for2 = this.checkIfCutPossibleFor2(nextPosition);
                      let for3 = this.checkIfCutPossibleFor3(nextPosition)
                      this.setState({ position41: nextPosition })
                      if (for1 === true || for2 === true || for3 === true) {
                        this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                        if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        }
                      } else {
                        this.setState({ isMovedBy4: true })
                        if (this.state.currentNumber === 6) this.setState({ turn4: true })
                      }
                    }
                  } else if (this.state.position41 >= 71 && this.state.position41 <= 75) {
                    nextPosition = this.state.position41 + this.state.currentNumber
                    if (nextPosition == 76) {
                      this.setState({ position41: 76 })
                      this.setState((prevState) => ({ winCountForFour: prevState.winCountForFour + 1 }));
                      if (this.state.winCountForFour === 4) {
                        this.setState({ isMovedBy4: true }, () => {
                          this.setState({ turn4: false });
                          this.setState({ turn1: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player4"],
                        }));
                        this.setState({ isMovedBy4: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 4 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                        if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        }
                      }
                      // this.setState({ isMovedBy4: true })
                    } else if (nextPosition > 76) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position41: nextPosition })
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }
                  }
                  else {
                    nextPosition = this.state.position41 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for2 = this.checkIfCutPossibleFor2(nextPosition);
                    let for3 = this.checkIfCutPossibleFor3(nextPosition)
                    this.setState({ position41: nextPosition })
                    if (for1 === true || for2 === true || for3 === true) {
                      this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                      if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                        this.setState({ isMovedBy3: true })
                      }
                    } else {
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }
                  }
                }
              }
              break;
            case 2:
              if (this.state.position42 != 76) {
                if (this.state.position42 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position42: 40 })
                    this.setState({ isMovedBy4: true })
                    this.setState({ turn4: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position42;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition <= 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for2 = this.checkIfCutPossibleFor2(extraMoves);
                    let for3 = this.checkIfCutPossibleFor3(extraMoves)
                    this.setState({ position42: extraMoves })
                    if (for1 === true || for2 === true || for3 === true) {
                      this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                      if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                        this.setState({ isMovedBy3: true })
                      }
                    } else {
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }
                  } else if (this.state.position42 >= 33 && this.state.position42 <= 38) {
                    if (nextPosition > 38) {
                      extraMoves = nextPosition - 38
                      newPosition = 70 + extraMoves
                      if (this.state.position42 == 38 && this.state.currentNumber == 6) {
                        this.setState({ position42: 76 })
                        this.setState((prevState) => ({ winCountForFour: prevState.winCountForFour + 1 }));
                        if (this.state.winCountForFour === 4) {
                          this.setState({ isMovedBy4: true }, () => {
                            this.setState({ turn4: false });
                            this.setState({ turn1: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player4"],
                          }));
                          this.setState({ isMovedBy4: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 4 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                          this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                          if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                            this.setState({ isMovedBy2: true })
                          } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                            this.setState({ isMovedBy3: true })
                          }
                        }
                        // this.setState({ isMovedBy4: true })
                      }
                      else {
                        this.setState({ position42: newPosition })
                        this.setState({ isMovedBy4: true })
                        if (this.state.currentNumber === 6) this.setState({ turn4: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for2 = this.checkIfCutPossibleFor2(nextPosition);
                      let for3 = this.checkIfCutPossibleFor3(nextPosition)
                      this.setState({ position42: nextPosition })
                      if (for1 === true || for2 === true || for3 === true) {
                        this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                        if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        }
                      } else {
                        this.setState({ isMovedBy4: true })
                        if (this.state.currentNumber === 6) this.setState({ turn4: true })
                      }
                    }
                  } else if (this.state.position42 >= 71 && this.state.position42 <= 75) {
                    nextPosition = this.state.position42 + this.state.currentNumber
                    if (nextPosition == 76) {
                      this.setState({ position41: 76 })
                      this.setState((prevState) => ({ winCountForFour: prevState.winCountForFour + 1 }));
                      if (this.state.winCountForFour === 4) {
                        this.setState({ isMovedBy4: true }, () => {
                          this.setState({ turn4: false });
                          this.setState({ turn1: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player4"],
                        }));
                        this.setState({ isMovedBy4: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 4 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                        if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        }
                      }
                      // this.setState({ isMovedBy4: true })
                    } else if (nextPosition > 76) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position42: nextPosition })
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }
                  }
                  else {
                    nextPosition = this.state.position42 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for2 = this.checkIfCutPossibleFor2(nextPosition);
                    let for3 = this.checkIfCutPossibleFor3(nextPosition)
                    this.setState({ position42: nextPosition })
                    if (for1 === true || for2 === true || for3 === true) {
                      this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                      if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                        this.setState({ isMovedBy3: true })
                      }
                    } else {
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }
                  }
                }
              }
              break;
            case 3:
              if (this.state.position43 != 76) {
                if (this.state.position43 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position43: 40 })
                    this.setState({ isMovedBy4: true })
                    this.setState({ turn4: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position43;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition <= 58) {
                    extraMoves = nextPosition - 52
                    this.setState({ position43: extraMoves })
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for2 = this.checkIfCutPossibleFor2(extraMoves);
                    let for3 = this.checkIfCutPossibleFor3(extraMoves)
                    if (for1 === true || for2 === true || for3 === true) {
                      this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                      if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                        this.setState({ isMovedBy3: true })
                      }
                    } else {
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }

                  } else if (this.state.position43 >= 33 && this.state.position43 <= 38) {
                    if (nextPosition > 38) {
                      extraMoves = nextPosition - 38
                      newPosition = 70 + extraMoves
                      if (this.state.position43 == 38 && this.state.currentNumber == 6) {
                        this.setState({ position43: 76 })
                        this.setState((prevState) => ({ winCountForFour: prevState.winCountForFour + 1 }));
                        if (this.state.winCountForFour === 4) {
                          this.setState({ isMovedBy4: true }, () => {
                            this.setState({ turn4: false });
                            this.setState({ turn1: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player4"],
                          }));
                          this.setState({ isMovedBy4: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 4 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                          this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                          if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                            this.setState({ isMovedBy2: true })
                          } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                            this.setState({ isMovedBy3: true })
                          }
                        }
                        // this.setState({ isMovedBy4: true })
                      }
                      else {
                        this.setState({ position43: newPosition })
                        this.setState({ isMovedBy4: true })
                        if (this.state.currentNumber === 6) this.setState({ turn4: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for2 = this.checkIfCutPossibleFor2(nextPosition);
                      let for3 = this.checkIfCutPossibleFor3(nextPosition)
                      this.setState({ position43: nextPosition })
                      if (for1 === true || for2 === true || for3 === true) {
                        this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                        if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        }
                      } else {
                        this.setState({ isMovedBy4: true })
                        if (this.state.currentNumber === 6) this.setState({ turn4: true })
                      }
                      // this.setState({ position43: newPosition })
                    }
                  } else if (this.state.position43 >= 71 && this.state.position43 <= 75) {
                    nextPosition = this.state.position43 + this.state.currentNumber
                    if (nextPosition == 76) {
                      this.setState({ position43: 76 })
                      this.setState((prevState) => ({ winCountForFour: prevState.winCountForFour + 1 }));
                      if (this.state.winCountForFour === 4) {
                        this.setState({ isMovedBy4: true }, () => {
                          this.setState({ turn4: false });
                          this.setState({ turn1: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player4"],
                        }));
                        this.setState({ isMovedBy4: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 4 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                        if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        }
                      }
                      // this.setState({ isMovedBy4: true })
                    } else if (nextPosition > 76) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position43: nextPosition })
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for2 = this.checkIfCutPossibleFor2(nextPosition);
                      let for3 = this.checkIfCutPossibleFor3(nextPosition)
                      if (for1 === true || for2 === true || for3 === true) {
                        this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                        if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        }
                      } else {
                        this.setState({ isMovedBy4: true })
                        if (this.state.currentNumber === 6) this.setState({ turn4: true })
                      }
                    }
                  }
                  else {
                    nextPosition = this.state.position43 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for2 = this.checkIfCutPossibleFor2(nextPosition);
                    let for3 = this.checkIfCutPossibleFor3(nextPosition)
                    this.setState({ position43: nextPosition })
                    if (for1 === true || for2 === true || for3 === true) {
                      this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                      if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                        this.setState({ isMovedBy3: true })
                      }
                    } else {
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }
                  }
                }
              }
              break;
            case 4:
              if (this.state.position44 != 76) {
                if (this.state.position44 < 0) {
                  if (this.state.currentNumber == 6) {
                    this.setState({ position44: 40 })
                    this.setState({ isMovedBy4: true })
                    this.setState({ turn4: true })
                  } else {
                    this.setState({ moveMessage: "" })
                  }
                } else {
                  var currentPosition = this.state.position44;
                  var nextPosition = this.state.currentNumber + currentPosition;
                  if (nextPosition > 52 && nextPosition <= 58) {
                    extraMoves = nextPosition - 52
                    let for1 = this.checkIfCutPossibleFor1(extraMoves);
                    let for2 = this.checkIfCutPossibleFor2(extraMoves);
                    let for3 = this.checkIfCutPossibleFor3(extraMoves)
                    if (for1 === true || for2 === true || for3 === true) {
                      this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                      if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                        this.setState({ isMovedBy3: true })
                      }
                    } else {
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }
                    this.setState({ position44: extraMoves })
                  } else if (this.state.position44 >= 33 && this.state.position44 <= 38) {
                    if (nextPosition > 38) {
                      extraMoves = nextPosition - 38
                      newPosition = 70 + extraMoves
                      if (this.state.position44 == 38 && this.state.currentNumber == 6) {
                        this.setState({ position44: 76 })
                        this.setState((prevState) => ({ winCountForFour: prevState.winCountForFour + 1 }));
                        if (this.state.winCountForFour === 4) {
                          this.setState({ isMovedBy4: true }, () => {
                            this.setState({ turn4: false });
                            this.setState({ turn1: true });
                          })
                          this.setState((prevState) => ({
                            winners: [...prevState.winners, "player4"],
                          }));
                          this.setState({ isMovedBy4: false }, () => {
                            this.setState({ turn1: false });
                            this.setState({ turn3: false }, () => {
                              console.log(this.state.turn2); // This will log the updated state
                              this.setState({ turn2: false });
                              this.setState({ turn4: false });
                              this.setState({ whoWon: 4 });
                              this.setState({ showWinPage: true });
                            });
                          });
                          console.log("Stop the game")
                        }
                        else {
                          this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                          this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                          if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                            this.setState({ isMovedBy2: true })
                          } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                            this.setState({ isMovedBy3: true })
                          }
                        }
                        // this.setState({ isMovedBy4: true })
                      }
                      else {
                        this.setState({ position44: newPosition })
                        this.setState({ isMovedBy4: true })
                        if (this.state.currentNumber === 6) this.setState({ turn4: true })
                      }
                    } else {
                      let for1 = this.checkIfCutPossibleFor1(nextPosition);
                      let for2 = this.checkIfCutPossibleFor2(nextPosition);
                      let for3 = this.checkIfCutPossibleFor3(nextPosition)
                      this.setState({ position44: nextPosition })
                      if (for1 === true || for2 === true || for3 === true) {
                        this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                        if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        }
                      } else {
                        this.setState({ isMovedBy4: true })
                        if (this.state.currentNumber === 6) this.setState({ turn4: true })
                      }
                    }
                  } else if (this.state.position44 >= 71 && this.state.position44 <= 75) {
                    nextPosition = this.state.position44 + this.state.currentNumber
                    if (nextPosition == 76) {
                      this.setState({ position44: 76 })
                      this.setState((prevState) => ({ winCountForFour: prevState.winCountForFour + 1 }));
                      if (this.state.winCountForFour === 4) {
                        this.setState({ isMovedBy4: true }, () => {
                          this.setState({ turn4: false });
                          this.setState({ turn1: true });
                        })
                        this.setState((prevState) => ({
                          winners: [...prevState.winners, "player4"],
                        }));
                        this.setState({ isMovedBy4: false }, () => {
                          this.setState({ turn1: false });
                          this.setState({ turn3: false }, () => {
                            console.log(this.state.turn2); // This will log the updated state
                            this.setState({ turn2: false });
                            this.setState({ turn4: false });
                            this.setState({ whoWon: 4 });
                            this.setState({ showWinPage: true });
                          });
                        });
                        console.log("Stop the game")
                      }
                      else {
                        this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                        this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                        if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                          this.setState({ isMovedBy2: true })
                        } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                          this.setState({ isMovedBy3: true })
                        }
                      }
                      // this.setState({ isMovedBy4: true })
                    } else if (nextPosition > 76) {
                      this.setState({ moveMessage: "" })
                    } else {
                      this.setState({ position44: nextPosition })
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }
                  }
                  else {
                    nextPosition = this.state.position44 + this.state.currentNumber
                    let for1 = this.checkIfCutPossibleFor1(nextPosition);
                    let for2 = this.checkIfCutPossibleFor2(nextPosition);
                    let for3 = this.checkIfCutPossibleFor3(nextPosition)
                    this.setState({ position44: nextPosition })
                    if (for1 === true || for2 === true || for3 === true) {
                      this.setState({ isMovedBy4: false }); this.setState({ whoseTurnToMove: 4 });
                      this.setState({ turn1: false }); this.setState({ turn2: false }); this.setState({ turn3: false }); this.setState({ turn4: true });
                      if (this.state.noOfPlayer === 3 && !this.checkIfAnythingOpened(2)) {
                        this.setState({ isMovedBy2: true })
                      } else if (this.state.noOfPlayer === 4 && !this.checkIfAnythingOpened(3)) {
                        this.setState({ isMovedBy3: true })
                      }
                    } else {
                      this.setState({ isMovedBy4: true })
                      if (this.state.currentNumber === 6) this.setState({ turn4: true })
                    }
                  }
                }
              }
              break;
          }
        } else {
          this.setState({ moveMessage: "" })
        }
        break;
    }
  }
  checkIfCutPossibleFor1 = (atPosition) => {
    if (atPosition != 1 && atPosition != 9 && atPosition != 14 && atPosition != 22 && atPosition != 27 && atPosition != 35 && atPosition != 40 && atPosition != 48) {
      if (this.state.position11 == atPosition) {
        if (this.state.position11 === this.state.position12 || this.state.position11 === this.state.position13 || this.state.position11 === this.state.position14) {
          return false;
        } else {
          this.setState({ position11: -18 })
          return true;
        }
      }
      if (this.state.position12 == atPosition) {
        if (this.state.position11 === this.state.position12 || this.state.position12 === this.state.position13 || this.state.position12 === this.state.position14) {
          return false;
        } else {
          this.setState({ position12: -21 })
          return true;
        }
      }
      if (this.state.position13 == atPosition) {
        if (this.state.position11 === this.state.position13 || this.state.position12 === this.state.position13 || this.state.position13 === this.state.position14) {
          return false;
        } else {
          this.setState({ position13: -31 })
          return true;
        }
      }
      if (this.state.position14 == atPosition) {
        if (this.state.position11 === this.state.position14 || this.state.position12 === this.state.position14 || this.state.position13 === this.state.position14) {
          return false;
        } else {
          this.setState({ position14: -41 })
          return true;
        }
      }
    }
    return false;
  }
  checkIfCutPossibleFor2 = (atPosition) => {
    if (atPosition != 1 && atPosition != 9 && atPosition != 14 && atPosition != 22 && atPosition != 27 && atPosition != 35 && atPosition != 40 && atPosition != 48) {
      if (this.state.position21 == atPosition) {
        if (this.state.position21 === this.state.position22 || this.state.position21 === this.state.position23 || this.state.position21 === this.state.position24) {
          return false;
        } else {
          this.setState({ position21: -12 })
          return true;
        }
      }
      if (this.state.position22 == atPosition) {
        if (this.state.position21 === this.state.position22 || this.state.position22 === this.state.position23 || this.state.position22 === this.state.position24) {
          return false;
        } else {
          this.setState({ position22: -22 })
          return true;
        }
      }
      if (this.state.position23 == atPosition) {
        if (this.state.position21 === this.state.position23 || this.state.position22 === this.state.position23 || this.state.position23 === this.state.position24) {
          return false;
        } else {
          this.setState({ position23: -32 })
          return true;
        }
      }
      if (this.state.position24 == atPosition) {
        if (this.state.position21 === this.state.position24 || this.state.position22 === this.state.position24 || this.state.position23 === this.state.position24) {
          return false;
        } else {
          this.setState({ position24: -42 })
          return true;
        }
      }
    }
    return false;
  }
  checkIfCutPossibleFor3 = (atPosition) => {
    if (atPosition != 1 && atPosition != 9 && atPosition != 14 && atPosition != 22 && atPosition != 27 && atPosition != 35 && atPosition != 40 && atPosition != 48) {
      if (this.state.position31 == atPosition) {
        if (this.state.position31 === this.state.position32 || this.state.position31 === this.state.position33 || this.state.position31 === this.state.position34) {
          return false;
        } else {
          this.setState({ position31: -13 })
          return true;
        }
      }
      if (this.state.position32 == atPosition) {
        if (this.state.position31 === this.state.position32 || this.state.position32 === this.state.position33 || this.state.position32 === this.state.position34) {
          return false;
        } else {
          this.setState({ position32: -23 })
          return true;
        }
      }
      if (this.state.position33 == atPosition) {
        if (this.state.position31 === this.state.position33 || this.state.position32 === this.state.position33 || this.state.position33 === this.state.position34) {
          return false;
        } else {
          this.setState({ position33: -33 })
          return true;
        }
      }
      if (this.state.position34 == atPosition) {
        if (this.state.position31 === this.state.position34 || this.state.position32 === this.state.position34 || this.state.position33 === this.state.position34) {
          return false;
        } else {
          this.setState({ position34: -43 })
          return true;
        }
      }
    }
    return false;
  }
  checkIfCutPossibleFor4 = (atPosition) => {
    if (atPosition != 1 && atPosition != 9 && atPosition != 14 && atPosition != 22 && atPosition != 27 && atPosition != 35 && atPosition != 40 && atPosition != 48) {
      if (this.state.position41 == atPosition) {
        if (this.state.position41 === this.state.position42 || this.state.position41 === this.state.position43 || this.state.position41 === this.state.position44) {
          return false;
        } else {
          this.setState({ position41: -14 })
          return true;
        }
      }
      if (this.state.position42 == atPosition) {
        if (this.state.position41 === this.state.position42 || this.state.position42 === this.state.position43 || this.state.position42 === this.state.position44) {
          return false;
        } else {
          this.setState({ position42: -24 })
          return true;
        }
      }
      if (this.state.position43 == atPosition) {
        if (this.state.position41 === this.state.position43 || this.state.position42 === this.state.position43 || this.state.position43 === this.state.position44) {
          return false;
        } else {
          this.setState({ position43: -34 })
          return true;
        }
      }
      if (this.state.position44 == atPosition) {
        if (this.state.position41 === this.state.position44 || this.state.position42 === this.state.position44 || this.state.position43 === this.state.position44) {
          return false;
        } else {
          this.setState({ position44: -44 })
          return true;
        }
      }
    }
    return false;
  }
  checkIfAnythingOpened = (player) => {
    switch (player) {
      case 1:
        if ((this.state.position11 < 0 || this.state.position11 === 58) && (this.state.position12 < 0 || this.state.position12 === 58) && (this.state.position13 < 0 || this.state.position13 === 58) && (this.state.position14 < 0 || this.state.position14 === 58)) {
          return true
        } else {
          return false
        }
      case 2:
        if ((this.state.position21 < 0 || this.state.position21 === 64) && (this.state.position22 < 0 || this.state.position22 === 64) && (this.state.position23 < 0 || this.state.position23 === 64) && (this.state.position24 < 0 || this.state.position24 === 64)) {
          return true
        } else {
          return false
        }
      case 3:
        if ((this.state.position31 < 0 || this.state.position31 === 70) && (this.state.position32 < 0 || this.state.position32 === 70) && (this.state.position33 < 0 || this.state.position33 === 70) && (this.state.position34 < 0 || this.state.position34 === 70)) {
          return true
        } else {
          return false
        }
      case 4:
        if ((this.state.position41 < 0 || this.state.position41 === 76) && (this.state.position42 < 0 || this.state.position42 === 76) && (this.state.position43 < 0 || this.state.position43 === 76) && (this.state.position44 < 0 || this.state.position44 === 76)) {
          return true
        } else {
          return false
        }
    }
  }
  generateRandomNumber = (player) => {
    var randomNumber = Math.floor(Math.random() * 6) + 1;
    console.log(randomNumber);
    this.setState({ turnMessage: " " }); this.setState({ moveMessage: "" })
    switch (player) {
      case 1:
        console.log(this.state.turn1 + "  " + this.state.isMovedBy4 + "  " + this.checkIfAnythingOpened(4))


        if (this.state.position11 + randomNumber > 58) {
          if ((this.state.position12 < 0 && randomNumber !== 6) || this.state.position12 + randomNumber > 58) {
            if ((this.state.position13 < 0 && randomNumber !== 6) || this.state.position13 + randomNumber > 58) {
              if ((this.state.position14 < 0 && randomNumber !== 6) || this.state.position14 + randomNumber > 58) {
                console.log("in it")
                this.setState({ turn1: false }, () => {
                  if (!this.checkIfAnythingOpened(1)) this.setState({ isMovedBy1: true })
                  if (this.state.noOfPlayer === 2) this.setState({ turn3: true });
                  else this.setState({ turn2: true });
                  console.log(this.state.turn1, this.state.isMovedBy1, this.state.turn2, this.state.turn3);
                });
              }
            }
          }
        }


        else if (this.state.position12 + randomNumber > 58) {
          if ((this.state.position14 < 0 && randomNumber !== 6) || this.state.position14 + randomNumber > 58) {
            if ((this.state.position13 < 0 && randomNumber !== 6) || this.state.position13 + randomNumber > 58) {
              if ((this.state.position11 < 0 && randomNumber !== 6) || this.state.position11 + randomNumber > 58) {
                console.log("in it")
                this.setState({ turn1: false }, () => {
                  if (!this.checkIfAnythingOpened(1)) this.setState({ isMovedBy1: true })
                  if (this.state.noOfPlayer === 2) this.setState({ turn3: true });
                  else this.setState({ turn2: true });
                  console.log(this.state.turn1, this.state.isMovedBy1, this.state.turn2, this.state.turn3);
                });
              }
            }
          }
        }


        else if (this.state.position13 + randomNumber > 58) {
          if ((this.state.position12 < 0 && randomNumber !== 6) || this.state.position12 + randomNumber > 58) {
            if ((this.state.position11 < 0 && randomNumber !== 6) || this.state.position11 + randomNumber > 58) {
              if ((this.state.position14 < 0 && randomNumber !== 6) || this.state.position14 + randomNumber > 58) {
                console.log("in it")
                this.setState({ turn1: false }, () => {
                  if (!this.checkIfAnythingOpened(1)) this.setState({ isMovedBy1: true })
                  if (this.state.noOfPlayer === 2) this.setState({ turn3: true });
                  else this.setState({ turn2: true });
                  console.log(this.state.turn1, this.state.isMovedBy1, this.state.turn2, this.state.turn3);
                });
              }
            }
          }
        }


        else if (this.state.position14 + randomNumber > 58) {
          if ((this.state.position12 < 0 && randomNumber !== 6) || this.state.position12 + randomNumber > 58) {
            if ((this.state.position11 < 0 && randomNumber !== 6) || this.state.position11 + randomNumber > 58) {
              if ((this.state.position11 < 0 && randomNumber !== 6) || this.state.position11 + randomNumber > 58) {
                console.log("in it")
                this.setState({ turn1: false }, () => {
                  if (!this.checkIfAnythingOpened(1)) this.setState({ isMovedBy1: true })
                  if (this.state.noOfPlayer === 2) this.setState({ turn3: true });
                  else this.setState({ turn2: true });
                  console.log(this.state.turn1, this.state.isMovedBy1, this.state.turn2, this.state.turn3);
                });
              }
            }
          }
        }

        if (this.state.position11 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken11: true })
        } else {
          if (randomNumber + this.state.position11 <= 58) this.setState({ showAnimatedToken11: true })
        }

        if (this.state.position12 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken12: true })
        } else {
          if (randomNumber + this.state.position12 <= 58) this.setState({ showAnimatedToken12: true })
        }

        if (this.state.position13 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken13: true })
        } else {
          if (randomNumber + this.state.position13 <= 58) this.setState({ showAnimatedToken13: true })
        }

        if (this.state.position14 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken14: true })
        } else {
          if (randomNumber + this.state.position14 <= 58) this.setState({ showAnimatedToken14: true })
        }


        if (this.state.noOfPlayer > 2 && this.state.turn1 && (this.state.isMovedBy4 || this.checkIfAnythingOpened(4))) {
          this.setState({ whoseTurnToMove: 1 })
          this.setState({ isMovedBy1: false })
          this.setState({ currentNumber: randomNumber })
          switch (randomNumber) {
            case 1:
              this.setState({ image1: require("../assets/dice1.png") })
              break;
            case 2:
              this.setState({ image1: require("../assets/dice2.png") })
              break;
            case 3:
              this.setState({ image1: require("../assets/dice3.png") })
              break;
            case 4:
              this.setState({ image1: require("../assets/dice4.png") })
              break;
            case 5:
              this.setState({ image1: require("../assets/dice5.png") })
              break;
            case 6:
              this.setState({ image1: require("../assets/dice6.png") })
              break;
          }
          if (randomNumber != 6) {
            this.setState({ turn1: false }); this.setState({ turn2: true }); this.setState({ isMovedBy4: false })
          } else {
            console.log("same conditions must be there")
            this.setState({ turn1: false })
          }
        } else if (this.state.noOfPlayer === 2 && this.state.turn1 && (this.state.isMovedBy3 || this.checkIfAnythingOpened(3))) {
          this.setState({ whoseTurnToMove: 1 })
          this.setState({ isMovedBy1: false })
          this.setState({ currentNumber: randomNumber })
          switch (randomNumber) {
            case 1:
              this.setState({ image1: require("../assets/dice1.png") })
              break;
            case 2:
              this.setState({ image1: require("../assets/dice2.png") })
              break;
            case 3:
              this.setState({ image1: require("../assets/dice3.png") })
              break;
            case 4:
              this.setState({ image1: require("../assets/dice4.png") })
              break;
            case 5:
              this.setState({ image1: require("../assets/dice5.png") })
              break;
            case 6:
              this.setState({ image1: require("../assets/dice6.png") })
              break;
          }
          if (randomNumber != 6) {
            this.setState({ turn1: false }); this.setState({ turn3: true }); this.setState({ isMovedBy3: false })
          } else {
            console.log("same conditions must be there")
            this.setState({ turn1: false })
          }
        } else {
          this.setState({ turnMessage: "It's Not Your Turn" })
        }
        break;
      case 2:
        console.log(this.state.turn2 + "  " + this.state.isMovedBy1 + "  " + this.checkIfAnythingOpened(1))



        if (this.state.position21 + randomNumber > 64) {
          if ((this.state.position22 < 0 && randomNumber !== 6) || this.state.position22 + randomNumber > 64) {
            if ((this.state.position23 < 0 && randomNumber !== 6) || this.state.position23 + randomNumber > 64) {
              if ((this.state.position24 < 0 && randomNumber !== 6) || this.state.position24 + randomNumber > 64) {
                console.log("in it")
                this.setState({ turn2: false }, () => {
                  if (!this.checkIfAnythingOpened(2)) this.setState({ isMovedBy2: true })
                  if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                  else this.setState({ turn3: true });
                });
              }
            }
          }
        }


        if (this.state.position22 + randomNumber > 64) {
          if ((this.state.position21 < 0 && randomNumber !== 6) || this.state.position21 + randomNumber > 64) {
            if ((this.state.position23 < 0 && randomNumber !== 6) || this.state.position23 + randomNumber > 64) {
              if ((this.state.position24 < 0 && randomNumber !== 6) || this.state.position24 + randomNumber > 64) {
                console.log("in it")
                this.setState({ turn2: false }, () => {
                  if (!this.checkIfAnythingOpened(2)) this.setState({ isMovedBy2: true })
                  if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                  else this.setState({ turn3: true });
                });
              }
            }
          }
        }

        if (this.state.position23 + randomNumber > 64) {
          if ((this.state.position22 < 0 && randomNumber !== 6) || this.state.position22 + randomNumber > 64) {
            if ((this.state.position21 < 0 && randomNumber !== 6) || this.state.position21 + randomNumber > 64) {
              if ((this.state.position24 < 0 && randomNumber !== 6) || this.state.position24 + randomNumber > 64) {
                console.log("in it")
                this.setState({ turn2: false }, () => {
                  if (!this.checkIfAnythingOpened(2)) this.setState({ isMovedBy2: true })
                  if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                  else this.setState({ turn3: true });
                });
              }
            }
          }
        }



        if (this.state.position24 + randomNumber > 64) {
          if ((this.state.position22 < 0 && randomNumber !== 6) || this.state.position22 + randomNumber > 64) {
            if ((this.state.position23 < 0 && randomNumber !== 6) || this.state.position23 + randomNumber > 64) {
              if ((this.state.position21 < 0 && randomNumber !== 6) || this.state.position21 + randomNumber > 64) {
                console.log("in it")
                this.setState({ turn2: false }, () => {
                  if (!this.checkIfAnythingOpened(2)) this.setState({ isMovedBy2: true })
                  if (this.state.noOfPlayer === 3) this.setState({ turn4: true });
                  else this.setState({ turn3: true });
                });
              }
            }
          }
        }




        if (this.state.position21 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken21: true })
        } else {
          if (randomNumber + this.state.position21 <= 64) this.setState({ showAnimatedToken21: true })
        }

        if (this.state.position22 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken22: true })
        } else {
          if (randomNumber + this.state.position22 <= 64) this.setState({ showAnimatedToken22: true })
        }

        if (this.state.position23 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken23: true })
        } else {
          if (randomNumber + this.state.position23 <= 64) this.setState({ showAnimatedToken23: true })
        }

        if (this.state.position24 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken24: true })
        } else {
          if (randomNumber + this.state.position24 <= 64) this.setState({ showAnimatedToken24: true })
        }



        if (this.state.noOfPlayer === 4 && this.state.turn2 && (this.state.isMovedBy1 || this.checkIfAnythingOpened(1))) {
          this.setState({ whoseTurnToMove: 2 })
          this.setState({ isMovedBy2: false })
          this.setState({ currentNumber: randomNumber })
          switch (randomNumber) {
            case 1:
              this.setState({ image2: require("../assets/dice1.png") })
              break;
            case 2:
              this.setState({ image2: require("../assets/dice2.png") })
              break;
            case 3:
              this.setState({ image2: require("../assets/dice3.png") })
              break;
            case 4:
              this.setState({ image2: require("../assets/dice4.png") })
              break;
            case 5:
              this.setState({ image2: require("../assets/dice5.png") })
              break;
            case 6:
              this.setState({ image2: require("../assets/dice6.png") })
              break;
          }
          if (randomNumber != 6) {
            this.setState({ turn2: false }); this.setState({ turn3: true }); this.setState({ isMovedBy1: false });
          } else {
            console.log("same conditions must be there")
            this.setState({ turn2: false })
          }
        } else if (this.state.noOfPlayer === 3 && this.state.turn2 && (this.state.isMovedBy1 || this.checkIfAnythingOpened(1))) {
          this.setState({ whoseTurnToMove: 2 })
          this.setState({ isMovedBy2: false })
          this.setState({ currentNumber: randomNumber })
          switch (randomNumber) {
            case 1:
              this.setState({ image2: require("../assets/dice1.png") })
              break;
            case 2:
              this.setState({ image2: require("../assets/dice2.png") })
              break;
            case 3:
              this.setState({ image2: require("../assets/dice3.png") })
              break;
            case 4:
              this.setState({ image2: require("../assets/dice4.png") })
              break;
            case 5:
              this.setState({ image2: require("../assets/dice5.png") })
              break;
            case 6:
              this.setState({ image2: require("../assets/dice6.png") })
              break;
          }
          if (randomNumber != 6) {
            this.setState({ turn2: false }); this.setState({ turn4: true }); this.setState({ isMovedBy1: false });
          } else {
            console.log("same conditions must be there")
            this.setState({ turn2: false })
          }
        } else {
          this.setState({ turnMessage: "It's Not Your Turn" })
        }
        break;
      case 3:
        console.log(this.state.turn3 + "  " + this.state.isMovedBy2 + "  " + this.checkIfAnythingOpened(2))
        console.log(randomNumber)

        if (this.state.position31 + randomNumber > 70) {
          if ((this.state.position32 < 0 && randomNumber !== 6) || this.state.position32 + randomNumber > 70) {
            if ((this.state.position33 < 0 && randomNumber !== 6) || this.state.position33 + randomNumber > 70) {
              if ((this.state.position34 < 0 && randomNumber !== 6) || this.state.position34 + randomNumber > 70) {
                console.log("in it")
                this.setState({ turn3: false }, () => {
                  if (!this.checkIfAnythingOpened(3)) this.setState({ isMovedBy3: true })
                  if (this.state.noOfPlayer === 2) {
                    this.setState({ turn1: true });
                  } else {
                    this.setState({ turn4: true });
                  }
                });
              }
            }
          }
        }


        if (this.state.position32 + randomNumber > 70) {
          if ((this.state.position31 < 0 && randomNumber !== 6) || this.state.position31 + randomNumber > 70) {
            if ((this.state.position33 < 0 && randomNumber !== 6) || this.state.position33 + randomNumber > 70) {
              if ((this.state.position34 < 0 && randomNumber !== 6) || this.state.position34 + randomNumber > 70) {
                console.log("in it")
                this.setState({ turn3: false }, () => {
                  if (!this.checkIfAnythingOpened(3)) this.setState({ isMovedBy3: true })
                  if (this.state.noOfPlayer === 2) {
                    this.setState({ turn1: true });
                  } else {
                    this.setState({ turn4: true });
                  }
                });
              }
            }
          }
        }


        if (this.state.position33 + randomNumber > 70) {
          if ((this.state.position32 < 0 && randomNumber !== 6) || this.state.position32 + randomNumber > 70) {
            if ((this.state.position31 < 0 && randomNumber !== 6) || this.state.position31 + randomNumber > 70) {
              if ((this.state.position34 < 0 && randomNumber !== 6) || this.state.position34 + randomNumber > 70) {
                console.log("in it")
                this.setState({ turn3: false }, () => {
                  if (!this.checkIfAnythingOpened(3)) this.setState({ isMovedBy3: true })
                  if (this.state.noOfPlayer === 2) {
                    this.setState({ turn1: true });
                  } else {
                    this.setState({ turn4: true });
                  }
                });
              }
            }
          }
        }


        if (this.state.position34 + randomNumber > 70) {
          if ((this.state.position32 < 0 && randomNumber !== 6) || this.state.position32 + randomNumber > 70) {
            if ((this.state.position33 < 0 && randomNumber !== 6) || this.state.position33 + randomNumber > 70) {
              if ((this.state.position31 < 0 && randomNumber !== 6) || this.state.position31 + randomNumber > 70) {
                console.log("in it")
                this.setState({ turn3: false }, () => {
                  if (!this.checkIfAnythingOpened(3)) this.setState({ isMovedBy3: true })
                  if (this.state.noOfPlayer === 2) {
                    this.setState({ turn1: true });
                  } else {
                    this.setState({ turn4: true });
                  }
                });
              }
            }
          }
        }



        if (this.state.position31 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken31: true })
        } else {
          if (randomNumber + this.state.position31 <= 70) this.setState({ showAnimatedToken31: true })
        }

        if (this.state.position32 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken32: true })
        } else {
          if (randomNumber + this.state.position32 <= 70) this.setState({ showAnimatedToken32: true })
        }

        if (this.state.position33 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken33: true })
        } else {
          if (randomNumber + this.state.position33 <= 70) this.setState({ showAnimatedToken33: true })
        }

        if (this.state.position34 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken34: true })
        } else {
          if (randomNumber + this.state.position34 <= 70) this.setState({ showAnimatedToken34: true })
        }




        if (this.state.noOfPlayer === 4 && this.state.turn3 && (this.state.isMovedBy2 || this.checkIfAnythingOpened(2))) {
          this.setState({ whoseTurnToMove: 3 })
          this.setState({ isMovedBy3: false })
          this.setState({ currentNumber: randomNumber })
          switch (randomNumber) {
            case 1:
              this.setState({ image3: require("../assets/dice1.png") })
              break;
            case 2:
              this.setState({ image3: require("../assets/dice2.png") })
              break;
            case 3:
              this.setState({ image3: require("../assets/dice3.png") })
              break;
            case 4:
              this.setState({ image3: require("../assets/dice4.png") })
              break;
            case 5:
              this.setState({ image3: require("../assets/dice5.png") })
              break;
            case 6:
              this.setState({ image3: require("../assets/dice6.png") })
              break;
          }
          if (randomNumber != 6) {
            this.setState({ turn3: false }); this.setState({ turn4: true }); this.setState({ isMovedBy2: false })
          } else {
            console.log("same conditions must be there")
            this.setState({ turn3: false })
          }
        } else if (this.state.noOfPlayer === 2 && this.state.turn3 && (this.state.isMovedBy1 || this.checkIfAnythingOpened(1))) {
          this.setState({ whoseTurnToMove: 3 })
          this.setState({ isMovedBy3: false })
          this.setState({ currentNumber: randomNumber })
          switch (randomNumber) {
            case 1:
              this.setState({ image3: require("../assets/dice1.png") })
              break;
            case 2:
              this.setState({ image3: require("../assets/dice2.png") })
              break;
            case 3:
              this.setState({ image3: require("../assets/dice3.png") })
              break;
            case 4:
              this.setState({ image3: require("../assets/dice4.png") })
              break;
            case 5:
              this.setState({ image3: require("../assets/dice5.png") })
              break;
            case 6:
              this.setState({ image3: require("../assets/dice6.png") })
              break;
          }
          if (randomNumber != 6) {
            this.setState({ turn3: false }); this.setState({ turn1: true }); this.setState({ isMovedBy1: false })
          } else {
            console.log("same conditions must be there")
            this.setState({ turn3: false })
          }
        } else {
          this.setState({ turnMessage: "It's Not Your Turn" })
        }
        break;
      case 4:
        console.log(this.state.turn4 + "  " + this.state.isMovedBy3 + "  " + this.checkIfAnythingOpened(3))


        if (this.state.position41 + randomNumber > 76) {
          if ((this.state.position42 < 0 && randomNumber !== 6) || this.state.position42 + randomNumber > 76) {
            if ((this.state.position43 < 0 && randomNumber !== 6) || this.state.position43 + randomNumber > 76) {
              if ((this.state.position44 < 0 && randomNumber !== 6) || this.state.position44 + randomNumber > 76) {
                console.log("in it")
                this.setState({ turn4: false }, () => {
                  if (!this.checkIfAnythingOpened(4)) this.setState({ isMovedBy4: true })
                  this.setState({ turn1: true });
                });
              }
            }
          }
        }



        if (this.state.position42 + randomNumber > 76) {
          if ((this.state.position41 < 0 && randomNumber !== 6) || this.state.position41 + randomNumber > 76) {
            if ((this.state.position43 < 0 && randomNumber !== 6) || this.state.position43 + randomNumber > 76) {
              if ((this.state.position44 < 0 && randomNumber !== 6) || this.state.position44 + randomNumber > 76) {
                console.log("in it")
                this.setState({ turn4: false }, () => {
                  if (!this.checkIfAnythingOpened(4)) this.setState({ isMovedBy4: true })
                  this.setState({ turn1: true });
                });
              }
            }
          }
        }


        if (this.state.position43 + randomNumber > 76) {
          if ((this.state.position42 < 0 && randomNumber !== 6) || this.state.position42 + randomNumber > 76) {
            if ((this.state.position41 < 0 && randomNumber !== 6) || this.state.position41 + randomNumber > 76) {
              if ((this.state.position44 < 0 && randomNumber !== 6) || this.state.position44 + randomNumber > 76) {
                console.log("in it")
                this.setState({ turn4: false }, () => {
                  if (!this.checkIfAnythingOpened(4)) this.setState({ isMovedBy4: true })
                  this.setState({ turn1: true });
                });
              }
            }
          }
        }



        if (this.state.position44 + randomNumber > 76) {
          if ((this.state.position42 < 0 && randomNumber !== 6) || this.state.position42 + randomNumber > 76) {
            if ((this.state.position43 < 0 && randomNumber !== 6) || this.state.position43 + randomNumber > 76) {
              if ((this.state.position41 < 0 && randomNumber !== 6) || this.state.position41 + randomNumber > 76) {
                console.log("in it")
                this.setState({ turn4: false }, () => {
                  if (!this.checkIfAnythingOpened(4)) this.setState({ isMovedBy4: true })
                  this.setState({ turn1: true });
                });
              }
            }
          }
        }



        if (this.state.position41 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken41: true })
        } else {
          if (randomNumber + this.state.position41 <= 76) this.setState({ showAnimatedToken41: true })
        }

        if (this.state.position42 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken42: true })
        } else {
          if (randomNumber + this.state.position42 <= 76) this.setState({ showAnimatedToken42: true })
        }

        if (this.state.position43 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken43: true })
        } else {
          if (randomNumber + this.state.position43 <= 76) this.setState({ showAnimatedToken43: true })
        }

        if (this.state.position44 < 0) {
          if (randomNumber === 6) this.setState({ showAnimatedToken44: true })
        } else {
          if (randomNumber + this.state.position44 <= 76) this.setState({ showAnimatedToken44: true })
        }



        if (this.state.noOfPlayer === 4 && this.state.turn4 && (this.state.isMovedBy3 || this.checkIfAnythingOpened(3))) {
          this.setState({ whoseTurnToMove: 4 })
          this.setState({ isMovedBy4: false })
          this.setState({ currentNumber: randomNumber })
          switch (randomNumber) {
            case 1:
              this.setState({ image4: require("../assets/dice1.png") })
              break;
            case 2:
              this.setState({ image4: require("../assets/dice2.png") })
              break;
            case 3:
              this.setState({ image4: require("../assets/dice3.png") })
              break;
            case 4:
              this.setState({ image4: require("../assets/dice4.png") })
              break;
            case 5:
              this.setState({ image4: require("../assets/dice5.png") })
              break;
            case 6:
              this.setState({ image4: require("../assets/dice6.png") })
              break;
          }
          if (randomNumber != 6) {
            this.setState({ turn4: false }); this.setState({ turn1: true }); this.setState({ isMovedBy3: false });
          } else {
            console.log("same conditions must be there")
            this.setState({ turn4: false })
          }
        } else if (this.state.noOfPlayer === 3 && this.state.turn4 && (this.state.isMovedBy2 || this.checkIfAnythingOpened(2))) {
          this.setState({ whoseTurnToMove: 4 })
          this.setState({ isMovedBy4: false })
          this.setState({ currentNumber: randomNumber })
          switch (randomNumber) {
            case 1:
              this.setState({ image4: require("../assets/dice1.png") })
              break;
            case 2:
              this.setState({ image4: require("../assets/dice2.png") })
              break;
            case 3:
              this.setState({ image4: require("../assets/dice3.png") })
              break;
            case 4:
              this.setState({ image4: require("../assets/dice4.png") })
              break;
            case 5:
              this.setState({ image4: require("../assets/dice5.png") })
              break;
            case 6:
              this.setState({ image4: require("../assets/dice6.png") })
              break;
          }
          if (randomNumber != 6) {
            this.setState({ turn4: false }); this.setState({ turn1: true }); this.setState({ isMovedBy2: false });
          } else {
            console.log("same conditions must be there")
            this.setState({ turn4: false })
          }
        } else {
          this.setState({ turnMessage: "It's Not Your Turn" })
        }
        break;
    }
  }
  rollDiceFor1st = () => {
    if (this.state.noOfPlayer > 2 && this.state.turn1 && (this.state.isMovedBy4 || this.checkIfAnythingOpened(4))) {
      this.setState({ showDiceroll1: true })
      setTimeout(() => {
        this.setState({ showDiceroll1: false }, () => {
          this.generateRandomNumber(1);
        });
      }, 600);
    } else if (this.state.noOfPlayer === 2 && this.state.turn1 && (this.state.isMovedBy3 || this.checkIfAnythingOpened(3))) {
      this.setState({ showDiceroll1: true })
      setTimeout(() => {
        this.setState({ showDiceroll1: false }, () => {
          this.generateRandomNumber(1);
        });
      }, 600);
    }
  }
  rollDiceFor2nd = () => {
    if (this.state.noOfPlayer === 4 && this.state.turn2 && (this.state.isMovedBy1 || this.checkIfAnythingOpened(1))) {
      this.setState({ showDiceroll2: true })
      setTimeout(() => {
        this.setState({ showDiceroll2: false }, () => {
          this.generateRandomNumber(2);
        });
      }, 600);
    } else if (this.state.noOfPlayer === 3 && this.state.turn2 && (this.state.isMovedBy1 || this.checkIfAnythingOpened(1))) {
      this.setState({ showDiceroll2: true })
      setTimeout(() => {
        this.setState({ showDiceroll2: false }, () => {
          this.generateRandomNumber(2);
        });
      }, 600);
    }
  }
  rollDiceFor3rd = () => {
    if (this.state.noOfPlayer === 4 && this.state.turn3 && (this.state.isMovedBy2 || this.checkIfAnythingOpened(2))) {
      this.setState({ showDiceroll3: true })
      setTimeout(() => {
        this.setState({ showDiceroll3: false }, () => {
          this.generateRandomNumber(3);
        });
      }, 600);
    } else if (this.state.noOfPlayer === 2 && this.state.turn3 && (this.state.isMovedBy1 || this.checkIfAnythingOpened(1))) {
      this.setState({ showDiceroll3: true })
      setTimeout(() => {
        this.setState({ showDiceroll3: false }, () => {
          this.generateRandomNumber(3);
        });
      }, 600);
    }
  }
  rollDiceFor4th = () => {
    if (this.state.noOfPlayer === 4 && this.state.turn4 && (this.state.isMovedBy3 || this.checkIfAnythingOpened(3))) {
      this.setState({ showDiceroll4: true })
      setTimeout(() => {
        this.setState({ showDiceroll4: false }, () => {
          this.generateRandomNumber(4);
        });
      }, 600);
    } else if (this.state.noOfPlayer === 3 && this.state.turn4 && (this.state.isMovedBy2 || this.checkIfAnythingOpened(2))) {
      this.setState({ showDiceroll4: true })
      setTimeout(() => {
        this.setState({ showDiceroll4: false }, () => {
          this.generateRandomNumber(4);
        });
      }, 600);
    }
  }
  checkPostion = (player, whichOne, position) => {
    switch (player) {
      case 1:
        switch (whichOne) {
          case 1:
            if (this.state.position11 === position) {
              if (this.state.position11 < 58) {
                return <FontAwesome
                style={[styles.red_position, { position: 'absolute' }]} // Use absolute positioning
                onPress={() => {
                  this.setState({
                    showAnimatedToken11: false,
                    showAnimatedToken12: false,
                    showAnimatedToken13: false,
                    showAnimatedToken14: false,
                  });
                  this.moveIcon(1, 1, position);
                }}
              >
                <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                  {!this.state.showAnimatedToken11 ? (
                    <Image size={30} style={styles.icons} source={require('../assets/red.png')} />
                  ) : (
                    <View>
                      <Animated.Image
                        style={[
                          styles.icons,
                          { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                        ]}
                        source={require('../assets/red-animation.gif')}
                      />
                    </View>
                  )}
                </Animated.View>
              </FontAwesome>
              } else {
                return <FontAwesome style={styles.red_position} onPress={() => { this.setState({ showAnimatedToken11: false, showAnimatedToken12: false, showAnimatedToken13: false, showAnimatedToken14: false }), this.moveIcon(1, 1, position) }}>
                  <Animated.View style={{ opacity: this.opacity }}>
                    <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/red.png')} />
                  </Animated.View></FontAwesome>
              }
              // return <Image style={styles.icons} source={require('../assets/red.png')} onPress={() => { this.moveIcon(1, 1, position) }} />
            }
            break;
          case 2:
            if (this.state.position12 === position) {
              if (this.state.position12 < 58) {
                return <FontAwesome
                style={[styles.red_position, { position: 'absolute' }]} // Use absolute positioning
                onPress={() => {
                  this.setState({
                    showAnimatedToken11: false,
                    showAnimatedToken12: false,
                    showAnimatedToken13: false,
                    showAnimatedToken14: false,
                  });
                  this.moveIcon(1, 2, position);
                }}
              >
                <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                  {!this.state.showAnimatedToken12 ? (
                    <Image size={30} style={styles.icons} source={require('../assets/red.png')} />
                  ) : (
                    <View>
                      <Animated.Image
                        style={[
                          styles.icons,
                          { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                        ]}
                        source={require('../assets/red-animation.gif')}
                      />
                    </View>
                  )}
                </Animated.View>
              </FontAwesome>
              } else {
                return <FontAwesome style={styles.red_position} onPress={() => { this.setState({ showAnimatedToken11: false, showAnimatedToken12: false, showAnimatedToken13: false, showAnimatedToken14: false }), this.moveIcon(1, 2, position) }}>
                  <Animated.View style={{ opacity: this.opacity }}>
                    <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/red.png')} />
                  </Animated.View></FontAwesome>
              }
            }
            break;
          case 3:
            if (this.state.position13 === position) {
              if (this.state.position13 < 58) {
                return <FontAwesome
                style={[styles.red_position, { position: 'absolute' }]} // Use absolute positioning
                onPress={() => {
                  this.setState({
                    showAnimatedToken11: false,
                    showAnimatedToken12: false,
                    showAnimatedToken13: false,
                    showAnimatedToken14: false,
                  });
                  this.moveIcon(1, 3, position);
                }}
              >
                <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                  {!this.state.showAnimatedToken13 ? (
                    <Image size={30} style={styles.icons} source={require('../assets/red.png')} />
                  ) : (
                    <View>
                      <Animated.Image
                        style={[
                          styles.icons,
                          { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                        ]}
                        source={require('../assets/red-animation.gif')}
                      />
                    </View>
                  )}
                </Animated.View>
              </FontAwesome>
              } else {
                return <FontAwesome style={styles.red_position} onPress={() => { this.moveIcon(1, 3, position) }}>
                  <Animated.View style={{ opacity: this.opacity }}>
                    <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/red.png')} />
                  </Animated.View></FontAwesome>
              }
            }
            break;
          case 4:
            if (this.state.position14 === position) {
              if (this.state.position14 < 58) {
                return <FontAwesome
                style={[styles.red_position, { position: 'absolute' }]} // Use absolute positioning
                onPress={() => {
                  this.setState({
                    showAnimatedToken11: false,
                    showAnimatedToken12: false,
                    showAnimatedToken13: false,
                    showAnimatedToken14: false,
                  });
                  this.moveIcon(1, 4, position);
                }}
              >
                <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                  {!this.state.showAnimatedToken14 ? (
                    <Image size={30} style={styles.icons} source={require('../assets/red.png')} />
                  ) : (
                    <View>
                      <Animated.Image
                        style={[
                          styles.icons,
                          { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                        ]}
                        source={require('../assets/red-animation.gif')}
                      />
                    </View>
                  )}
                </Animated.View>
              </FontAwesome>
              } else {
                return <FontAwesome style={styles.red_position} onPress={() => { this.moveIcon(1, 4, position) }}>
                  <Animated.View style={{ opacity: this.opacity }}>
                    <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/red.png')} />
                  </Animated.View></FontAwesome>
              }
            }
            break;
        }
        break;
      case 2:
        if (this.state.noOfPlayer >= 3) {
          switch (whichOne) {
            case 1:
              if (this.state.position21 === position) {
                if (this.state.position21 < 64) {
                  return <FontAwesome
                  style={[styles.green_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken21: false,
                      showAnimatedToken22: false,
                      showAnimatedToken23: false,
                      showAnimatedToken24: false,
                    });
                    this.moveIcon(2, 1, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken21 ? (
                      <Image size={10} style={styles.icons} source={require('../assets/green.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={[
                            styles.icons,
                            { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                          ]}
                          source={require('../assets/green-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                } else {
                  return <FontAwesome style={styles.green_position} onPress={() => { this.moveIcon(2, 1, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/green.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
            case 2:
              if (this.state.position22 === position) {
                if (this.state.position22 < 64) {
                  return <FontAwesome
                  style={[styles.green_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken21: false,
                      showAnimatedToken22: false,
                      showAnimatedToken23: false,
                      showAnimatedToken24: false,
                    });
                    this.moveIcon(2, 2, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken22 ? (
                      <Image size={10} style={styles.icons} source={require('../assets/green.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={[
                            styles.icons,
                            { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                          ]}
                          source={require('../assets/green-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                } else {
                  return <FontAwesome style={styles.green_position} onPress={() => { this.moveIcon(2, 2, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/green.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
            case 3:
              if (this.state.position23 === position) {
                if (this.state.position23 < 64) {
                  return <FontAwesome
                  style={[styles.green_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken21: false,
                      showAnimatedToken22: false,
                      showAnimatedToken23: false,
                      showAnimatedToken24: false,
                    });
                    this.moveIcon(2, 3, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken23 ? (
                      <Image size={10} style={styles.icons} source={require('../assets/green.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={[
                            styles.icons,
                            { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                          ]}
                          source={require('../assets/green-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                } else {
                  return <FontAwesome style={styles.green_position} onPress={() => { this.moveIcon(2, 3, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/green.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
            case 4:
              if (this.state.position24 === position) {
                if (this.state.position24 < 64) {
                  return <FontAwesome
                  style={[styles.green_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken21: false,
                      showAnimatedToken22: false,
                      showAnimatedToken23: false,
                      showAnimatedToken24: false,
                    });
                    this.moveIcon(2, 4, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken24 ? (
                      <Image size={10} style={styles.icons} source={require('../assets/green.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={[
                            styles.icons,
                            { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                          ]}
                          source={require('../assets/green-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                } else {
                  return <FontAwesome style={styles.green_position} onPress={() => { this.moveIcon(2, 4, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/green.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
          }
        }
        break;
      case 3:
        if (this.state.noOfPlayer === 2 || this.state.noOfPlayer === 4) {
          switch (whichOne) {
            case 1:
              if (this.state.position31 === position) {
                if (this.state.position31 < 70) {
                  return <FontAwesome
                  style={[styles.yellow_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken31: false,
                      showAnimatedToken32: false,
                      showAnimatedToken33: false,
                      showAnimatedToken34: false,
                    });
                    this.moveIcon(3, 1, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken31 ? (
                      <Image size={10} style={styles.iconss} source={require('../assets/yellow.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={styles.animatedIcons}
                          source={require('../assets/yellow-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                
                } else {
                  return <FontAwesome style={styles.yellow_position} onPress={() => { this.moveIcon(3, 1, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.iconss, { height: 38, width: 38, position: 'relative', top: 10 }]} source={require('../assets/yellow.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
            case 2:
              if (this.state.position32 === position) {
                if (this.state.position32 < 70) {
                  return <FontAwesome
                  style={[styles.yellow_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken31: false,
                      showAnimatedToken32: false,
                      showAnimatedToken33: false,
                      showAnimatedToken34: false,
                    });
                    this.moveIcon(3, 2, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken32 ? (
                      <Image size={10} style={styles.iconss} source={require('../assets/yellow.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={styles.animatedIcons}
                          source={require('../assets/yellow-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                
                } else {
                  return <FontAwesome style={styles.yellow_position} onPress={() => { this.moveIcon(3, 2, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.iconss, { height: 38, width: 38, position: 'relative', top: 10 }]} source={require('../assets/yellow.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
            case 3:
              if (this.state.position33 === position) {
                if (this.state.position33 < 70) {
                  return <FontAwesome
                  style={[styles.yellow_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken31: false,
                      showAnimatedToken32: false,
                      showAnimatedToken33: false,
                      showAnimatedToken34: false,
                    });
                    this.moveIcon(3, 3, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken33 ? (
                      <Image size={10} style={styles.iconss} source={require('../assets/yellow.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={styles.animatedIcons}
                          source={require('../assets/yellow-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                
                } else {
                  return <FontAwesome style={styles.yellow_position} onPress={() => { this.moveIcon(3, 3, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.iconss, { height: 38, width: 38, position: 'relative', top: 10 }]} source={require('../assets/yellow.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
            case 4:
              if (this.state.position34 === position) {
                if (this.state.position34 < 70) {
                  return <FontAwesome
                  style={[styles.yellow_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken31: false,
                      showAnimatedToken32: false,
                      showAnimatedToken33: false,
                      showAnimatedToken34: false,
                    });
                    this.moveIcon(3, 4, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken34 ? (
                      <Image size={10} style={styles.iconss} source={require('../assets/yellow.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={styles.animatedIcons}
                          source={require('../assets/yellow-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                
                } else {
                  return <FontAwesome style={styles.yellow_position} onPress={() => { this.moveIcon(3, 4, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.iconss, { height: 38, width: 38, position: 'relative', top: 10 }]} source={require('../assets/yellow.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
          }
        }
        break;
      case 4:
        if (this.state.noOfPlayer !== 2) {
          switch (whichOne) {
            case 1:
              if (this.state.position41 === position) {
                if (this.state.position41 < 76) {
                  return <FontAwesome
                  style={[styles.blue_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken41: false,
                      showAnimatedToken42: false,
                      showAnimatedToken43: false,
                      showAnimatedToken44: false,
                    });
                    this.moveIcon(4, 1, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken41 ? (
                      <Image size={10} style={styles.icons} source={require('../assets/blue.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={[
                            styles.icons,
                            { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                          ]}
                          source={require('../assets/blue-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                
                } else {
                  return <FontAwesome style={styles.blue_position} onPress={() => { this.moveIcon(4, 1, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/blue.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
            case 2:
              if (this.state.position42 === position) {
                if (this.state.position42 < 76) {
                  return <FontAwesome
                  style={[styles.blue_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken41: false,
                      showAnimatedToken42: false,
                      showAnimatedToken43: false,
                      showAnimatedToken44: false,
                    });
                    this.moveIcon(4, 2, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken42 ? (
                      <Image size={10} style={styles.icons} source={require('../assets/blue.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={[
                            styles.icons,
                            { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                          ]}
                          source={require('../assets/blue-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                
                } else {
                  return <FontAwesome style={styles.blue_position} onPress={() => { this.moveIcon(4, 2, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/blue.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
            case 3:
              if (this.state.position43 === position) {
                if (this.state.position43 < 76) {
                  return <FontAwesome
                  style={[styles.blue_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken41: false,
                      showAnimatedToken42: false,
                      showAnimatedToken43: false,
                      showAnimatedToken44: false,
                    });
                    this.moveIcon(4, 3, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken43 ? (
                      <Image size={10} style={styles.icons} source={require('../assets/blue.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={[
                            styles.icons,
                            { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                          ]}
                          source={require('../assets/blue-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                
                } else {
                  return <FontAwesome style={styles.blue_position} onPress={() => { this.moveIcon(4, 3, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/blue.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
            case 4:
              if (this.state.position44 === position) {
                if (this.state.position44 < 76) {
                  return <FontAwesome
                  style={[styles.blue_position, { position: 'absolute' }]}
                  onPress={() => {
                    this.setState({
                      showAnimatedToken41: false,
                      showAnimatedToken42: false,
                      showAnimatedToken43: false,
                      showAnimatedToken44: false,
                    });
                    this.moveIcon(4, 4, position);
                  }}
                >
                  <Animated.View style={{ opacity: this.opacity, zIndex: 1000 }}>
                    {!this.state.showAnimatedToken44 ? (
                      <Image size={10} style={styles.icons} source={require('../assets/blue.png')} />
                    ) : (
                      <View>
                        <Animated.Image
                          style={[
                            styles.icons,
                            { height: 150, width: 150, top: -45, left: -48, position: 'relative', zIndex: 1000 },
                          ]}
                          source={require('../assets/blue-animation.gif')}
                        />
                      </View>
                    )}
                  </Animated.View>
                </FontAwesome>
                
                } else {
                  return <FontAwesome style={styles.blue_position} onPress={() => { this.moveIcon(4, 4, position) }}>
                    <Animated.View style={{ opacity: this.opacity }}>
                      <Image size={30} style={[styles.icons, { height: 30, width: 30, position: 'relative' }]} source={require('../assets/blue.png')} />
                    </Animated.View></FontAwesome>
                }
              }
              break;
          }
        }
        break;
    }
  }
  render() {
    return (
      <View style={styles.container}>

        {this.state.showWinPage ? <View>
          <View style={styles.container1}>
            <Image style={{ width: '20%', height: '20%' }} source={require('../assets/king_crown-removebg-preview.png')}></Image>
            <Text style={{ color: "white", fontSize: 28, fontWeight: 'bold', fontStyle: "italic", paddingTop: 25 }}>!!!Congratulations!!!</Text>
            <Text style={{ color: "white", fontSize: 28, fontWeight: 'bold', fontStyle: "italic", paddingTop: 25 }}>Player {this.state.whoWon} Won</Text>
            <TouchableOpacity style={styles.startButton} onPress={() => this.props.navigation.navigate("menu")}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View> : null}


        <Image style={{ position: "absolute", width: "100%", height: "100%" }} source={require('../assets/bgimg.jpg')} />
        {!this.state.showWinPage?<View style={styles.wholeSetup}>
          {/* =============================== Upper Part ============================= */}


          <View style={row.Style}>
            <View>
              {this.state.noOfPlayer === 2 && this.state.turn1 && (this.state.isMovedBy3 || this.checkIfAnythingOpened(3)) ?
                <Image style={styles.pointer1} source={require('../assets/arrowanimation.gif')} /> :
                this.state.noOfPlayer > 2 && this.state.turn1 && (this.state.isMovedBy4 || this.checkIfAnythingOpened(4)) ?
                  <Image style={styles.pointer1} source={require('../assets/arrowanimation.gif')} /> : null}
              <TouchableOpacity style={styles.diceBox1}
                disabled={this.state.turn1 ? false : true}
                onPress={() => this.rollDiceFor1st()}>
                {this.state.showDiceroll1 === false ? <View style={{ top: -4 }}>
                  <Image style={{ width: 45, height: 45, top: -3 }} source={this.state.image1} />
                </View>
                  : <View>
                    <Image source={require('../assets/diceroll.gif')} style={{ width: 70, height: 70, top: -10, left: -2 }} />
                  </View>}
              </TouchableOpacity>

              <View style={[Players.styles, { marginLeft: Dimensions.get("window").width / 50, borderRightWidth: 1, marginTop: 2 }]}>
                <View style={{ width: '100%', height: '102%', top: -1.5, backgroundColor: "#D43230" }}>
                  <View style={{ justifyContent: "center", top: 10, alignItems: "center" }}>
                    <Text style={{ position: "absolute", color: "white", fontWeight: "bold", fontStyle: "italic", fontSize: 15 }}>Player 1</Text>
                  </View>
                  <View style={styles.homeContainer}>
                    <View style={row.Style}>
                      <View style={[styles.places]}>
                        <TouchableOpacity>
                          {this.checkPostion(1, 1, -11)}
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.places, { marginLeft: 90 }]}>
                        <TouchableOpacity>
                          {this.checkPostion(1, 2, -21)}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={row.Style}>
                      <View style={[styles.places, { marginTop: 80 }]} >
                        <TouchableOpacity>
                          {this.checkPostion(1, 3, -31)}
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.places, { marginTop: 80, marginLeft: 90 }]}>
                        <TouchableOpacity>
                          {this.checkPostion(1, 4, -41)}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

            </View>
            <View style={[row.Style, { marginTop: 82, borderTopWidth: 0 }]}>
              <View style={[styles.first]}>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 11)}{this.checkPostion(1, 2, 11)}{this.checkPostion(1, 3, 11)}{this.checkPostion(1, 4, 11)}
                  {this.checkPostion(2, 1, 11)}{this.checkPostion(2, 2, 11)}{this.checkPostion(2, 3, 11)}{this.checkPostion(2, 4, 11)}
                  {this.checkPostion(3, 1, 11)}{this.checkPostion(3, 2, 11)}{this.checkPostion(3, 3, 11)}{this.checkPostion(3, 4, 11)}
                  {this.checkPostion(4, 1, 11)}{this.checkPostion(4, 2, 11)}{this.checkPostion(4, 3, 11)}{this.checkPostion(4, 4, 11)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 10)}{this.checkPostion(1, 2, 10)}{this.checkPostion(1, 3, 10)}{this.checkPostion(1, 4, 10)}
                  {this.checkPostion(2, 1, 10)}{this.checkPostion(2, 2, 10)}{this.checkPostion(2, 3, 10)}{this.checkPostion(2, 4, 10)}
                  {this.checkPostion(3, 1, 10)}{this.checkPostion(3, 2, 10)}{this.checkPostion(3, 3, 10)}{this.checkPostion(3, 4, 10)}
                  {this.checkPostion(4, 1, 10)}{this.checkPostion(4, 2, 10)}{this.checkPostion(4, 3, 10)}{this.checkPostion(4, 4, 10)}
                </View>
                <View style={[styles.item, { backgroundColor: "#229746" }]}>
                  <FontAwesome name="star" size={20} color={"white"} style={{ position: "absolute", left: 2 }} />
                  {this.checkPostion(1, 1, 9)}{this.checkPostion(1, 2, 9)}{this.checkPostion(1, 3, 9)}{this.checkPostion(1, 4, 9)}
                  {this.checkPostion(2, 1, 9)}{this.checkPostion(2, 2, 9)}{this.checkPostion(2, 3, 9)}{this.checkPostion(2, 4, 9)}
                  {this.checkPostion(3, 1, 9)}{this.checkPostion(3, 2, 9)}{this.checkPostion(3, 3, 9)}{this.checkPostion(3, 4, 9)}
                  {this.checkPostion(4, 1, 9)}{this.checkPostion(4, 2, 9)}{this.checkPostion(4, 3, 9)}{this.checkPostion(4, 4, 9)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 8)}{this.checkPostion(1, 2, 8)}{this.checkPostion(1, 3, 8)}{this.checkPostion(1, 4, 8)}
                  {this.checkPostion(2, 1, 8)}{this.checkPostion(2, 2, 8)}{this.checkPostion(2, 3, 8)}{this.checkPostion(2, 4, 8)}
                  {this.checkPostion(3, 1, 8)}{this.checkPostion(3, 2, 8)}{this.checkPostion(3, 3, 8)}{this.checkPostion(3, 4, 8)}
                  {this.checkPostion(4, 1, 8)}{this.checkPostion(4, 2, 8)}{this.checkPostion(4, 3, 8)}{this.checkPostion(4, 4, 8)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 7)}{this.checkPostion(1, 2, 7)}{this.checkPostion(1, 3, 7)}{this.checkPostion(1, 4, 7)}
                  {this.checkPostion(2, 1, 7)}{this.checkPostion(2, 2, 7)}{this.checkPostion(2, 3, 7)}{this.checkPostion(2, 4, 7)}
                  {this.checkPostion(3, 1, 7)}{this.checkPostion(3, 2, 7)}{this.checkPostion(3, 3, 7)}{this.checkPostion(3, 4, 7)}
                  {this.checkPostion(4, 1, 7)}{this.checkPostion(4, 2, 7)}{this.checkPostion(4, 3, 7)}{this.checkPostion(4, 4, 7)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 6)}{this.checkPostion(1, 2, 6)}{this.checkPostion(1, 3, 6)}{this.checkPostion(1, 4, 6)}
                  {this.checkPostion(2, 1, 6)}{this.checkPostion(2, 2, 6)}{this.checkPostion(2, 3, 6)}{this.checkPostion(2, 4, 6)}
                  {this.checkPostion(3, 1, 6)}{this.checkPostion(3, 2, 6)}{this.checkPostion(3, 3, 6)}{this.checkPostion(3, 4, 6)}
                  {this.checkPostion(4, 1, 6)}{this.checkPostion(4, 2, 6)}{this.checkPostion(4, 3, 6)}{this.checkPostion(4, 4, 6)}
                </View>
              </View>
              <View style={[styles.second]}>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 12)}{this.checkPostion(1, 2, 12)}{this.checkPostion(1, 3, 12)}{this.checkPostion(1, 4, 12)}
                  {this.checkPostion(2, 1, 12)}{this.checkPostion(2, 2, 12)}{this.checkPostion(2, 3, 12)}{this.checkPostion(2, 4, 12)}
                  {this.checkPostion(3, 1, 12)}{this.checkPostion(3, 2, 12)}{this.checkPostion(3, 3, 12)}{this.checkPostion(3, 4, 12)}
                  {this.checkPostion(4, 1, 12)}{this.checkPostion(4, 2, 12)}{this.checkPostion(4, 3, 12)}{this.checkPostion(4, 4, 12)}
                </View>
                <View style={[styles.item, styles.green]}>
                  {this.checkPostion(1, 1, 59)}{this.checkPostion(1, 2, 59)}{this.checkPostion(1, 3, 59)}{this.checkPostion(1, 4, 59)}
                  {this.checkPostion(2, 1, 59)}{this.checkPostion(2, 2, 59)}{this.checkPostion(2, 3, 59)}{this.checkPostion(2, 4, 59)}
                  {this.checkPostion(3, 1, 59)}{this.checkPostion(3, 2, 59)}{this.checkPostion(3, 3, 59)}{this.checkPostion(3, 4, 59)}
                  {this.checkPostion(4, 1, 59)}{this.checkPostion(4, 2, 59)}{this.checkPostion(4, 3, 59)}{this.checkPostion(4, 4, 59)}
                </View>
                <View style={[styles.item, styles.green]}>
                  {this.checkPostion(1, 1, 60)}{this.checkPostion(1, 2, 60)}{this.checkPostion(1, 3, 60)}{this.checkPostion(1, 4, 60)}
                  {this.checkPostion(2, 1, 60)}{this.checkPostion(2, 2, 60)}{this.checkPostion(2, 3, 60)}{this.checkPostion(2, 4, 60)}
                  {this.checkPostion(3, 1, 60)}{this.checkPostion(3, 2, 60)}{this.checkPostion(3, 3, 60)}{this.checkPostion(3, 4, 60)}
                  {this.checkPostion(4, 1, 60)}{this.checkPostion(4, 2, 60)}{this.checkPostion(4, 3, 60)}{this.checkPostion(4, 4, 60)}
                </View>
                <View style={[styles.item, styles.green]}>
                  {this.checkPostion(1, 1, 61)}{this.checkPostion(1, 2, 61)}{this.checkPostion(1, 3, 61)}{this.checkPostion(1, 4, 61)}
                  {this.checkPostion(2, 1, 61)}{this.checkPostion(2, 2, 61)}{this.checkPostion(2, 3, 61)}{this.checkPostion(2, 4, 61)}
                  {this.checkPostion(3, 1, 61)}{this.checkPostion(3, 2, 61)}{this.checkPostion(3, 3, 61)}{this.checkPostion(3, 4, 61)}
                  {this.checkPostion(4, 1, 61)}{this.checkPostion(4, 2, 61)}{this.checkPostion(4, 3, 61)}{this.checkPostion(4, 4, 61)}
                </View>
                <View style={[styles.item, styles.green]}>
                  {this.checkPostion(1, 1, 62)}{this.checkPostion(1, 2, 62)}{this.checkPostion(1, 3, 62)}{this.checkPostion(1, 4, 62)}
                  {this.checkPostion(2, 1, 62)}{this.checkPostion(2, 2, 62)}{this.checkPostion(2, 3, 62)}{this.checkPostion(2, 4, 62)}
                  {this.checkPostion(3, 1, 62)}{this.checkPostion(3, 2, 62)}{this.checkPostion(3, 3, 62)}{this.checkPostion(3, 4, 62)}
                  {this.checkPostion(4, 1, 62)}{this.checkPostion(4, 2, 62)}{this.checkPostion(4, 3, 62)}{this.checkPostion(4, 4, 62)}
                </View>
                <View style={[styles.item, styles.green]}>
                  {this.checkPostion(1, 1, 63)}{this.checkPostion(1, 2, 63)}{this.checkPostion(1, 3, 63)}{this.checkPostion(1, 4, 63)}
                  {this.checkPostion(2, 1, 63)}{this.checkPostion(2, 2, 63)}{this.checkPostion(2, 3, 63)}{this.checkPostion(2, 4, 63)}
                  {this.checkPostion(3, 1, 63)}{this.checkPostion(3, 2, 63)}{this.checkPostion(3, 3, 63)}{this.checkPostion(3, 4, 63)}
                  {this.checkPostion(4, 1, 63)}{this.checkPostion(4, 2, 63)}{this.checkPostion(4, 3, 63)}{this.checkPostion(4, 4, 63)}
                </View>
                <View style={[styles.item, styles.green, { marginBottom: -25, zIndex: 1, borderColor: "#229746" }]}>
                  {this.checkPostion(1, 1, 64)}{this.checkPostion(1, 2, 64)}{this.checkPostion(1, 3, 64)}{this.checkPostion(1, 4, 64)}
                  {this.checkPostion(2, 1, 64)}{this.checkPostion(2, 2, 64)}{this.checkPostion(2, 3, 64)}{this.checkPostion(2, 4, 64)}
                  {this.checkPostion(3, 1, 64)}{this.checkPostion(3, 2, 64)}{this.checkPostion(3, 3, 64)}{this.checkPostion(3, 4, 64)}
                  {this.checkPostion(4, 1, 64)}{this.checkPostion(4, 2, 64)}{this.checkPostion(4, 3, 64)}{this.checkPostion(4, 4, 64)}
                </View>
              </View>
              <View style={[styles.third,]}>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 13)}{this.checkPostion(1, 2, 13)}{this.checkPostion(1, 3, 13)}{this.checkPostion(1, 4, 13)}
                  {this.checkPostion(2, 1, 13)}{this.checkPostion(2, 2, 13)}{this.checkPostion(2, 3, 13)}{this.checkPostion(2, 4, 13)}
                  {this.checkPostion(3, 1, 13)}{this.checkPostion(3, 2, 13)}{this.checkPostion(3, 3, 13)}{this.checkPostion(3, 4, 13)}
                  {this.checkPostion(4, 1, 13)}{this.checkPostion(4, 2, 13)}{this.checkPostion(4, 3, 13)}{this.checkPostion(4, 4, 13)}
                </View>
                <View style={[styles.item, { backgroundColor: "#229746" }]}>
                  <FontAwesome name="star" size={20} color={"white"} style={{ position: "absolute", left: 2 }} />
                  {this.checkPostion(1, 1, 14)}{this.checkPostion(1, 2, 14)}{this.checkPostion(1, 3, 14)}{this.checkPostion(1, 4, 14)}
                  {this.checkPostion(2, 1, 14)}{this.checkPostion(2, 2, 14)}{this.checkPostion(2, 3, 14)}{this.checkPostion(2, 4, 14)}
                  {this.checkPostion(3, 1, 14)}{this.checkPostion(3, 2, 14)}{this.checkPostion(3, 3, 14)}{this.checkPostion(3, 4, 14)}
                  {this.checkPostion(4, 1, 14)}{this.checkPostion(4, 2, 14)}{this.checkPostion(4, 3, 14)}{this.checkPostion(4, 4, 14)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 15)}{this.checkPostion(1, 2, 15)}{this.checkPostion(1, 3, 15)}{this.checkPostion(1, 4, 15)}
                  {this.checkPostion(2, 1, 15)}{this.checkPostion(2, 2, 15)}{this.checkPostion(2, 3, 15)}{this.checkPostion(2, 4, 15)}
                  {this.checkPostion(3, 1, 15)}{this.checkPostion(3, 2, 15)}{this.checkPostion(3, 3, 15)}{this.checkPostion(3, 4, 15)}
                  {this.checkPostion(4, 1, 15)}{this.checkPostion(4, 2, 15)}{this.checkPostion(4, 3, 15)}{this.checkPostion(4, 4, 15)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 16)}{this.checkPostion(1, 2, 16)}{this.checkPostion(1, 3, 16)}{this.checkPostion(1, 4, 16)}
                  {this.checkPostion(2, 1, 16)}{this.checkPostion(2, 2, 16)}{this.checkPostion(2, 3, 16)}{this.checkPostion(2, 4, 16)}
                  {this.checkPostion(3, 1, 16)}{this.checkPostion(3, 2, 16)}{this.checkPostion(3, 3, 16)}{this.checkPostion(3, 4, 16)}
                  {this.checkPostion(4, 1, 16)}{this.checkPostion(4, 2, 16)}{this.checkPostion(4, 3, 16)}{this.checkPostion(4, 4, 16)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 17)}{this.checkPostion(1, 2, 17)}{this.checkPostion(1, 3, 17)}{this.checkPostion(1, 4, 17)}
                  {this.checkPostion(2, 1, 17)}{this.checkPostion(2, 2, 17)}{this.checkPostion(2, 3, 17)}{this.checkPostion(2, 4, 17)}
                  {this.checkPostion(3, 1, 17)}{this.checkPostion(3, 2, 17)}{this.checkPostion(3, 3, 17)}{this.checkPostion(3, 4, 17)}
                  {this.checkPostion(4, 1, 17)}{this.checkPostion(4, 2, 17)}{this.checkPostion(4, 3, 17)}{this.checkPostion(4, 4, 17)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 18)}{this.checkPostion(1, 2, 18)}{this.checkPostion(1, 3, 18)}{this.checkPostion(1, 4, 18)}
                  {this.checkPostion(2, 1, 18)}{this.checkPostion(2, 2, 18)}{this.checkPostion(2, 3, 18)}{this.checkPostion(2, 4, 18)}
                  {this.checkPostion(3, 1, 18)}{this.checkPostion(3, 2, 18)}{this.checkPostion(3, 3, 18)}{this.checkPostion(3, 4, 18)}
                  {this.checkPostion(4, 1, 18)}{this.checkPostion(4, 2, 18)}{this.checkPostion(4, 3, 18)}{this.checkPostion(4, 4, 18)}
                </View>
              </View>
            </View>
            <View>
              {this.state.noOfPlayer > 2 && this.state.turn2 && (this.state.isMovedBy1 || this.checkIfAnythingOpened(1)) ?
                <Image style={styles.pointer1} source={require('../assets/arrowanimation.gif')} /> : null}
              {this.state.noOfPlayer > 2 ? <TouchableOpacity style={styles.diceBox2} disabled={this.state.noOfPlayer === 2 ? true : this.state.turn2 === false ? true : false} onPress={() => this.rollDiceFor2nd()}>
                {this.state.noOfPlayer > 2 && this.state.showDiceroll2 === false ? <Image style={{ width: 45, height: 45, top: -7 }} source={this.state.image2} /> :
                  this.state.noOfPlayer > 2 && this.state.showDiceroll2 === true ?
                    <View>
                      <Image source={require('../assets/diceroll.gif')} style={{ width: 70, height: 70, top: -10, left: -2 }} />
                    </View> :
                    <Image style={{ width: 90, height: 70, marginLeft: 30, marginBottom: 10 }} />}
              </TouchableOpacity> : <View style={{ height: 60, width: 60, marginBottom: 20 }}></View>}
              <View style={[Players.styles, { borderWidth: 1, marginTop: 1.7 }]}>
                <View style={{ width: '100%', height: '100%', backgroundColor: "#229746" }}>
                  <View style={styles.homeContainer}>
                    <View style={{ justifyContent: "center", top: -13, alignItems: "center" }}>
                      <Text style={{ position: "absolute", color: "white", fontWeight: "bold", fontStyle: "italic", fontSize: 15 }}>Player 2</Text>
                    </View>
                    <View style={row.Style}>
                      <View style={styles.places}>
                        <TouchableOpacity>
                          {this.checkPostion(2, 1, -12)}
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.places, { marginLeft: 90 }]}>
                        <TouchableOpacity>
                          {this.checkPostion(2, 2, -22)}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={row.Style}>
                      <View style={[styles.places, { marginTop: 80 }]}>
                        <TouchableOpacity>
                          {this.checkPostion(2, 3, -32)}
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.places, { marginLeft: 90, marginTop: 80 }]}>
                        <TouchableOpacity>
                          {this.checkPostion(2, 4, -42)}
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

              </View>
            </View>

          </View>
          {/* =============================== Middle Part =============================== */}
          <View style={row.Style}>
            {/* ============================= First Triplet ============================== */}
            <View style={styles.First}>
              <View style={[row.Style, { borderLeftWidth: 2 }]}>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 52)}{this.checkPostion(1, 2, 52)}{this.checkPostion(1, 3, 52)}{this.checkPostion(1, 4, 52)}
                  {this.checkPostion(2, 1, 52)}{this.checkPostion(2, 2, 52)}{this.checkPostion(2, 3, 52)}{this.checkPostion(2, 4, 52)}
                  {this.checkPostion(3, 1, 52)}{this.checkPostion(3, 2, 52)}{this.checkPostion(3, 3, 52)}{this.checkPostion(3, 4, 52)}
                  {this.checkPostion(4, 1, 52)}{this.checkPostion(4, 2, 52)}{this.checkPostion(4, 3, 52)}{this.checkPostion(4, 4, 52)}
                </View>
                <View style={[styles.item, styles.red, { backgroundColor: "#D43230" }]}>
                  <FontAwesome name="star" size={20} color={"white"} style={{ position: "absolute", left: 2 }} />
                  {this.checkPostion(1, 1, 1)}{this.checkPostion(1, 2, 1)}{this.checkPostion(1, 3, 1)}{this.checkPostion(1, 4, 1)}
                  {this.checkPostion(2, 1, 1)}{this.checkPostion(2, 2, 1)}{this.checkPostion(2, 3, 1)}{this.checkPostion(2, 4, 1)}
                  {this.checkPostion(3, 1, 1)}{this.checkPostion(3, 2, 1)}{this.checkPostion(3, 3, 1)}{this.checkPostion(3, 4, 1)}
                  {this.checkPostion(4, 1, 1)}{this.checkPostion(4, 2, 1)}{this.checkPostion(4, 3, 1)}{this.checkPostion(4, 4, 1)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 2)}{this.checkPostion(1, 2, 2)}{this.checkPostion(1, 3, 2)}{this.checkPostion(1, 4, 2)}
                  {this.checkPostion(2, 1, 2)}{this.checkPostion(2, 2, 2)}{this.checkPostion(2, 3, 2)}{this.checkPostion(2, 4, 2)}
                  {this.checkPostion(3, 1, 2)}{this.checkPostion(3, 2, 2)}{this.checkPostion(3, 3, 2)}{this.checkPostion(3, 4, 2)}
                  {this.checkPostion(4, 1, 2)}{this.checkPostion(4, 2, 2)}{this.checkPostion(4, 3, 2)}{this.checkPostion(4, 4, 2)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 3)}{this.checkPostion(1, 2, 3)}{this.checkPostion(1, 3, 3)}{this.checkPostion(1, 4, 3)}
                  {this.checkPostion(2, 1, 3)}{this.checkPostion(2, 2, 3)}{this.checkPostion(2, 3, 3)}{this.checkPostion(2, 4, 3)}
                  {this.checkPostion(3, 1, 3)}{this.checkPostion(3, 2, 3)}{this.checkPostion(3, 3, 3)}{this.checkPostion(3, 4, 3)}
                  {this.checkPostion(4, 1, 3)}{this.checkPostion(4, 2, 3)}{this.checkPostion(4, 3, 3)}{this.checkPostion(4, 4, 3)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 4)}{this.checkPostion(1, 2, 4)}{this.checkPostion(1, 3, 4)}{this.checkPostion(1, 4, 4)}
                  {this.checkPostion(2, 1, 4)}{this.checkPostion(2, 2, 4)}{this.checkPostion(2, 3, 4)}{this.checkPostion(2, 4, 4)}
                  {this.checkPostion(3, 1, 4)}{this.checkPostion(3, 2, 4)}{this.checkPostion(3, 3, 4)}{this.checkPostion(3, 4, 4)}
                  {this.checkPostion(4, 1, 4)}{this.checkPostion(4, 2, 4)}{this.checkPostion(4, 3, 4)}{this.checkPostion(4, 4, 4)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 5)}{this.checkPostion(1, 2, 5)}{this.checkPostion(1, 3, 5)}{this.checkPostion(1, 4, 5)}
                  {this.checkPostion(2, 1, 5)}{this.checkPostion(2, 2, 5)}{this.checkPostion(2, 3, 5)}{this.checkPostion(2, 4, 5)}
                  {this.checkPostion(3, 1, 5)}{this.checkPostion(3, 2, 5)}{this.checkPostion(3, 3, 5)}{this.checkPostion(3, 4, 5)}
                  {this.checkPostion(4, 1, 5)}{this.checkPostion(4, 2, 5)}{this.checkPostion(4, 3, 5)}{this.checkPostion(4, 4, 5)}
                </View>
              </View>
              <View style={[row.Style, { borderLeftWidth: 2 }]}>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 51)}{this.checkPostion(1, 2, 51)}{this.checkPostion(1, 3, 51)}{this.checkPostion(1, 4, 51)}
                  {this.checkPostion(2, 1, 51)}{this.checkPostion(2, 2, 51)}{this.checkPostion(2, 3, 51)}{this.checkPostion(2, 4, 51)}
                  {this.checkPostion(3, 1, 51)}{this.checkPostion(3, 2, 51)}{this.checkPostion(3, 3, 51)}{this.checkPostion(3, 4, 51)}
                  {this.checkPostion(4, 1, 51)}{this.checkPostion(4, 2, 51)}{this.checkPostion(4, 3, 51)}{this.checkPostion(4, 4, 51)}
                </View>
                <View style={[styles.item, styles.red]}>
                  {this.checkPostion(1, 1, 53)}{this.checkPostion(1, 2, 53)}{this.checkPostion(1, 3, 53)}{this.checkPostion(1, 4, 53)}
                  {this.checkPostion(2, 1, 53)}{this.checkPostion(2, 2, 53)}{this.checkPostion(2, 3, 53)}{this.checkPostion(2, 4, 53)}
                  {this.checkPostion(3, 1, 53)}{this.checkPostion(3, 2, 53)}{this.checkPostion(3, 3, 53)}{this.checkPostion(3, 4, 53)}
                  {this.checkPostion(4, 1, 53)}{this.checkPostion(4, 2, 53)}{this.checkPostion(4, 3, 53)}{this.checkPostion(4, 4, 53)}
                </View>
                <View style={[styles.item, styles.red]}>
                  {this.checkPostion(1, 1, 54)}{this.checkPostion(1, 2, 54)}{this.checkPostion(1, 3, 54)}{this.checkPostion(1, 4, 54)}
                  {this.checkPostion(2, 1, 54)}{this.checkPostion(2, 2, 54)}{this.checkPostion(2, 3, 54)}{this.checkPostion(2, 4, 54)}
                  {this.checkPostion(3, 1, 54)}{this.checkPostion(3, 2, 54)}{this.checkPostion(3, 3, 54)}{this.checkPostion(3, 4, 54)}
                  {this.checkPostion(4, 1, 54)}{this.checkPostion(4, 2, 54)}{this.checkPostion(4, 3, 54)}{this.checkPostion(4, 4, 54)}
                </View>
                <View style={[styles.item, styles.red]}>
                  {this.checkPostion(1, 1, 55)}{this.checkPostion(1, 2, 55)}{this.checkPostion(1, 3, 55)}{this.checkPostion(1, 4, 55)}
                  {this.checkPostion(2, 1, 55)}{this.checkPostion(2, 2, 55)}{this.checkPostion(2, 3, 55)}{this.checkPostion(2, 4, 55)}
                  {this.checkPostion(3, 1, 55)}{this.checkPostion(3, 2, 55)}{this.checkPostion(3, 3, 55)}{this.checkPostion(3, 4, 55)}
                  {this.checkPostion(4, 1, 55)}{this.checkPostion(4, 2, 55)}{this.checkPostion(4, 3, 55)}{this.checkPostion(4, 4, 55)}
                </View>
                <View style={[styles.item, styles.red]}>
                  {this.checkPostion(1, 1, 56)}{this.checkPostion(1, 2, 56)}{this.checkPostion(1, 3, 56)}{this.checkPostion(1, 4, 56)}
                  {this.checkPostion(2, 1, 56)}{this.checkPostion(2, 2, 56)}{this.checkPostion(2, 3, 56)}{this.checkPostion(2, 4, 56)}
                  {this.checkPostion(3, 1, 56)}{this.checkPostion(3, 2, 56)}{this.checkPostion(3, 3, 56)}{this.checkPostion(3, 4, 56)}
                  {this.checkPostion(4, 1, 56)}{this.checkPostion(4, 2, 56)}{this.checkPostion(4, 3, 56)}{this.checkPostion(4, 4, 56)}
                </View>
                <View style={[styles.item, styles.red]}>
                  {this.checkPostion(1, 1, 57)}{this.checkPostion(1, 2, 57)}{this.checkPostion(1, 3, 57)}{this.checkPostion(1, 4, 57)}
                  {this.checkPostion(2, 1, 57)}{this.checkPostion(2, 2, 57)}{this.checkPostion(2, 3, 57)}{this.checkPostion(2, 4, 57)}
                  {this.checkPostion(3, 1, 57)}{this.checkPostion(3, 2, 57)}{this.checkPostion(3, 3, 57)}{this.checkPostion(3, 4, 57)}
                  {this.checkPostion(4, 1, 57)}{this.checkPostion(4, 2, 57)}{this.checkPostion(4, 3, 57)}{this.checkPostion(4, 4, 57)}
                </View>
                <View style={[styles.item, styles.red, { marginRight: -25, borderColor: "#D43230", zIndex: 1 }]}>
                  {this.checkPostion(1, 1, 58)}{this.checkPostion(1, 2, 58)}{this.checkPostion(1, 3, 58)}{this.checkPostion(1, 4, 58)}
                  {this.checkPostion(2, 1, 58)}{this.checkPostion(2, 2, 58)}{this.checkPostion(2, 3, 58)}{this.checkPostion(2, 4, 58)}
                  {this.checkPostion(3, 1, 58)}{this.checkPostion(3, 2, 58)}{this.checkPostion(3, 3, 58)}{this.checkPostion(3, 4, 58)}
                  {this.checkPostion(4, 1, 58)}{this.checkPostion(4, 2, 58)}{this.checkPostion(4, 3, 58)}{this.checkPostion(4, 4, 58)}
                </View>
              </View>
              <View style={[row.Style, { borderLeftWidth: 2 }]}>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 50)}{this.checkPostion(1, 2, 50)}{this.checkPostion(1, 3, 50)}{this.checkPostion(1, 4, 50)}
                  {this.checkPostion(2, 1, 50)}{this.checkPostion(2, 2, 50)}{this.checkPostion(2, 3, 50)}{this.checkPostion(2, 4, 50)}
                  {this.checkPostion(3, 1, 50)}{this.checkPostion(3, 2, 50)}{this.checkPostion(3, 3, 50)}{this.checkPostion(3, 4, 50)}
                  {this.checkPostion(4, 1, 50)}{this.checkPostion(4, 2, 50)}{this.checkPostion(4, 3, 50)}{this.checkPostion(4, 4, 50)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 49)}{this.checkPostion(1, 2, 49)}{this.checkPostion(1, 3, 49)}{this.checkPostion(1, 4, 49)}
                  {this.checkPostion(2, 1, 49)}{this.checkPostion(2, 2, 49)}{this.checkPostion(2, 3, 49)}{this.checkPostion(2, 4, 49)}
                  {this.checkPostion(3, 1, 49)}{this.checkPostion(3, 2, 49)}{this.checkPostion(3, 3, 49)}{this.checkPostion(3, 4, 49)}
                  {this.checkPostion(4, 1, 49)}{this.checkPostion(4, 2, 49)}{this.checkPostion(4, 3, 49)}{this.checkPostion(4, 4, 49)}
                </View>
                <View style={[styles.item, { backgroundColor: "#D43230" }]}>
                  <FontAwesome name="star" size={20} color={"white"} style={{ position: "absolute", left: 2 }} />
                  {this.checkPostion(1, 1, 48)}{this.checkPostion(1, 2, 48)}{this.checkPostion(1, 3, 48)}{this.checkPostion(1, 4, 48)}
                  {this.checkPostion(2, 1, 48)}{this.checkPostion(2, 2, 48)}{this.checkPostion(2, 3, 48)}{this.checkPostion(2, 4, 48)}
                  {this.checkPostion(3, 1, 48)}{this.checkPostion(3, 2, 48)}{this.checkPostion(3, 3, 48)}{this.checkPostion(3, 4, 48)}
                  {this.checkPostion(4, 1, 48)}{this.checkPostion(4, 2, 48)}{this.checkPostion(4, 3, 48)}{this.checkPostion(4, 4, 48)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 47)}{this.checkPostion(1, 2, 47)}{this.checkPostion(1, 3, 47)}{this.checkPostion(1, 4, 47)}
                  {this.checkPostion(2, 1, 47)}{this.checkPostion(2, 2, 47)}{this.checkPostion(2, 3, 47)}{this.checkPostion(2, 4, 47)}
                  {this.checkPostion(3, 1, 47)}{this.checkPostion(3, 2, 47)}{this.checkPostion(3, 3, 47)}{this.checkPostion(3, 4, 47)}
                  {this.checkPostion(4, 1, 47)}{this.checkPostion(4, 2, 47)}{this.checkPostion(4, 3, 47)}{this.checkPostion(4, 4, 47)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 46)}{this.checkPostion(1, 2, 46)}{this.checkPostion(1, 3, 46)}{this.checkPostion(1, 4, 46)}
                  {this.checkPostion(2, 1, 46)}{this.checkPostion(2, 2, 46)}{this.checkPostion(2, 3, 46)}{this.checkPostion(2, 4, 46)}
                  {this.checkPostion(3, 1, 46)}{this.checkPostion(3, 2, 46)}{this.checkPostion(3, 3, 46)}{this.checkPostion(3, 4, 46)}
                  {this.checkPostion(4, 1, 46)}{this.checkPostion(4, 2, 46)}{this.checkPostion(4, 3, 46)}{this.checkPostion(4, 4, 46)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 45)}{this.checkPostion(1, 2, 45)}{this.checkPostion(1, 3, 45)}{this.checkPostion(1, 4, 45)}
                  {this.checkPostion(2, 1, 45)}{this.checkPostion(2, 2, 45)}{this.checkPostion(2, 3, 45)}{this.checkPostion(2, 4, 45)}
                  {this.checkPostion(3, 1, 45)}{this.checkPostion(3, 2, 45)}{this.checkPostion(3, 3, 45)}{this.checkPostion(3, 4, 45)}
                  {this.checkPostion(4, 1, 45)}{this.checkPostion(4, 2, 45)}{this.checkPostion(4, 3, 45)}{this.checkPostion(4, 4, 45)}
                </View>
              </View>
            </View>
            {/* ============================= Winner Zone =========================== */}
            <View style={styles.winnerZone}>
              <Image source={require('../assets/winner_zone.png')} style={{ width: 75, height: 77, left: -7, top: -4, position: "absolute" }} />
              <View style={{ top: 20, left: -2 }}>
                {this.checkPostion(1, 1, 58)}{this.checkPostion(2, 1, "winner")}{this.checkPostion(3, 1, "winner")}{this.checkPostion(4, 1, "winner")}
              </View>
              <View style={{ top: 20, left: -2 }}>
                {this.checkPostion(2, 2, "winner")}{this.checkPostion(1, 2, 58)}{this.checkPostion(3, 2, "winner")}{this.checkPostion(4, 2, "winner")}
              </View>
              <View style={{ top: 20, left: -2 }}>
                {this.checkPostion(3, 3, "winner")}{this.checkPostion(1, 3, 58)}{this.checkPostion(2, 3, "winner")}{this.checkPostion(4, 3, "winner")}
              </View>
              <View style={{ top: 20, left: -2 }}>
                {this.checkPostion(4, 4, "winner")}{this.checkPostion(1, 4, 58)}{this.checkPostion(2, 4, "winner")}{this.checkPostion(3, 4, "winner")}
              </View>
            </View>
            {/* ============================== Last Triplet */}
            <View style={[styles.Second, { left: -2 }]}>
              <View style={[row.Style, { borderRightWidth: 2 }]}>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 19)}{this.checkPostion(1, 2, 19)}{this.checkPostion(1, 3, 19)}{this.checkPostion(1, 4, 19)}
                  {this.checkPostion(2, 1, 19)}{this.checkPostion(2, 2, 19)}{this.checkPostion(2, 3, 19)}{this.checkPostion(2, 4, 19)}
                  {this.checkPostion(3, 1, 19)}{this.checkPostion(3, 2, 19)}{this.checkPostion(3, 3, 19)}{this.checkPostion(3, 4, 19)}
                  {this.checkPostion(4, 1, 19)}{this.checkPostion(4, 2, 19)}{this.checkPostion(4, 3, 19)}{this.checkPostion(4, 4, 19)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 20)}{this.checkPostion(1, 2, 20)}{this.checkPostion(1, 3, 20)}{this.checkPostion(1, 4, 20)}
                  {this.checkPostion(2, 1, 20)}{this.checkPostion(2, 2, 20)}{this.checkPostion(2, 3, 20)}{this.checkPostion(2, 4, 20)}
                  {this.checkPostion(3, 1, 20)}{this.checkPostion(3, 2, 20)}{this.checkPostion(3, 3, 20)}{this.checkPostion(3, 4, 20)}
                  {this.checkPostion(4, 1, 20)}{this.checkPostion(4, 2, 20)}{this.checkPostion(4, 3, 20)}{this.checkPostion(4, 4, 20)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 21)}{this.checkPostion(1, 2, 21)}{this.checkPostion(1, 3, 21)}{this.checkPostion(1, 4, 21)}
                  {this.checkPostion(2, 1, 21)}{this.checkPostion(2, 2, 21)}{this.checkPostion(2, 3, 21)}{this.checkPostion(2, 4, 21)}
                  {this.checkPostion(3, 1, 21)}{this.checkPostion(3, 2, 21)}{this.checkPostion(3, 3, 21)}{this.checkPostion(3, 4, 21)}
                  {this.checkPostion(4, 1, 21)}{this.checkPostion(4, 2, 21)}{this.checkPostion(4, 3, 21)}{this.checkPostion(4, 4, 21)}
                </View>
                <View style={[styles.item, { backgroundColor: "#F5C601" }]}>
                  <FontAwesome name="star" size={20} color={"white"} style={{ position: "absolute", left: 2 }} />
                  {this.checkPostion(1, 1, 22)}{this.checkPostion(1, 2, 22)}{this.checkPostion(1, 3, 22)}{this.checkPostion(1, 4, 22)}
                  {this.checkPostion(2, 1, 22)}{this.checkPostion(2, 2, 22)}{this.checkPostion(2, 3, 22)}{this.checkPostion(2, 4, 22)}
                  {this.checkPostion(3, 1, 22)}{this.checkPostion(3, 2, 22)}{this.checkPostion(3, 3, 22)}{this.checkPostion(3, 4, 22)}
                  {this.checkPostion(4, 1, 22)}{this.checkPostion(4, 2, 22)}{this.checkPostion(4, 3, 22)}{this.checkPostion(4, 4, 22)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 23)}{this.checkPostion(1, 2, 23)}{this.checkPostion(1, 3, 23)}{this.checkPostion(1, 4, 23)}
                  {this.checkPostion(2, 1, 23)}{this.checkPostion(2, 2, 23)}{this.checkPostion(2, 3, 23)}{this.checkPostion(2, 4, 23)}
                  {this.checkPostion(3, 1, 23)}{this.checkPostion(3, 2, 23)}{this.checkPostion(3, 3, 23)}{this.checkPostion(3, 4, 23)}
                  {this.checkPostion(4, 1, 23)}{this.checkPostion(4, 2, 23)}{this.checkPostion(4, 3, 23)}{this.checkPostion(4, 4, 23)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 24)}{this.checkPostion(1, 2, 24)}{this.checkPostion(1, 3, 24)}{this.checkPostion(1, 4, 24)}
                  {this.checkPostion(2, 1, 24)}{this.checkPostion(2, 2, 24)}{this.checkPostion(2, 3, 24)}{this.checkPostion(2, 4, 24)}
                  {this.checkPostion(3, 1, 24)}{this.checkPostion(3, 2, 24)}{this.checkPostion(3, 3, 24)}{this.checkPostion(3, 4, 24)}
                  {this.checkPostion(4, 1, 24)}{this.checkPostion(4, 2, 24)}{this.checkPostion(4, 3, 24)}{this.checkPostion(4, 4, 24)}
                </View>
              </View>
              <View style={[row.Style, { borderRightWidth: 2 }]}>
                <View style={[styles.item, styles.orange, { marginLeft: -25, borderColor: "#F5C601" }]}>
                  {this.checkPostion(1, 1, 70)}{this.checkPostion(1, 2, 70)}{this.checkPostion(1, 3, 70)}{this.checkPostion(1, 4, 70)}
                  {this.checkPostion(2, 1, 70)}{this.checkPostion(2, 2, 70)}{this.checkPostion(2, 3, 70)}{this.checkPostion(2, 4, 70)}
                  {this.checkPostion(3, 1, 70)}{this.checkPostion(3, 2, 70)}{this.checkPostion(3, 3, 70)}{this.checkPostion(3, 4, 70)}
                  {this.checkPostion(4, 1, 70)}{this.checkPostion(4, 2, 70)}{this.checkPostion(4, 3, 70)}{this.checkPostion(4, 4, 70)}
                </View>
                <View style={[styles.item, styles.orange]}>
                  {this.checkPostion(1, 1, 69)}{this.checkPostion(1, 2, 69)}{this.checkPostion(1, 3, 69)}{this.checkPostion(1, 4, 69)}
                  {this.checkPostion(2, 1, 69)}{this.checkPostion(2, 2, 69)}{this.checkPostion(2, 3, 69)}{this.checkPostion(2, 4, 69)}
                  {this.checkPostion(3, 1, 69)}{this.checkPostion(3, 2, 69)}{this.checkPostion(3, 3, 69)}{this.checkPostion(3, 4, 69)}
                  {this.checkPostion(4, 1, 69)}{this.checkPostion(4, 2, 69)}{this.checkPostion(4, 3, 69)}{this.checkPostion(4, 4, 69)}
                </View>
                <View style={[styles.item, styles.orange]}>
                  {this.checkPostion(1, 1, 68)}{this.checkPostion(1, 2, 68)}{this.checkPostion(1, 3, 68)}{this.checkPostion(1, 4, 68)}
                  {this.checkPostion(2, 1, 68)}{this.checkPostion(2, 2, 68)}{this.checkPostion(2, 3, 68)}{this.checkPostion(2, 4, 68)}
                  {this.checkPostion(3, 1, 68)}{this.checkPostion(3, 2, 68)}{this.checkPostion(3, 3, 68)}{this.checkPostion(3, 4, 68)}
                  {this.checkPostion(4, 1, 68)}{this.checkPostion(4, 2, 68)}{this.checkPostion(4, 3, 68)}{this.checkPostion(4, 4, 68)}
                </View>
                <View style={[styles.item, styles.orange]}>
                  {this.checkPostion(1, 1, 67)}{this.checkPostion(1, 2, 67)}{this.checkPostion(1, 3, 67)}{this.checkPostion(1, 4, 67)}
                  {this.checkPostion(2, 1, 67)}{this.checkPostion(2, 2, 67)}{this.checkPostion(2, 3, 67)}{this.checkPostion(2, 4, 67)}
                  {this.checkPostion(3, 1, 67)}{this.checkPostion(3, 2, 67)}{this.checkPostion(3, 3, 67)}{this.checkPostion(3, 4, 67)}
                  {this.checkPostion(4, 1, 67)}{this.checkPostion(4, 2, 67)}{this.checkPostion(4, 3, 67)}{this.checkPostion(4, 4, 67)}
                </View>
                <View style={[styles.item, styles.orange]}>
                  {this.checkPostion(1, 1, 66)}{this.checkPostion(1, 2, 66)}{this.checkPostion(1, 3, 66)}{this.checkPostion(1, 4, 66)}
                  {this.checkPostion(2, 1, 66)}{this.checkPostion(2, 2, 66)}{this.checkPostion(2, 3, 66)}{this.checkPostion(2, 4, 66)}
                  {this.checkPostion(3, 1, 66)}{this.checkPostion(3, 2, 66)}{this.checkPostion(3, 3, 66)}{this.checkPostion(3, 4, 66)}
                  {this.checkPostion(4, 1, 66)}{this.checkPostion(4, 2, 66)}{this.checkPostion(4, 3, 66)}{this.checkPostion(4, 4, 66)}
                </View>
                <View style={[styles.item, styles.orange]}>
                  {this.checkPostion(1, 1, 65)}{this.checkPostion(1, 2, 65)}{this.checkPostion(1, 3, 65)}{this.checkPostion(1, 4, 65)}
                  {this.checkPostion(2, 1, 65)}{this.checkPostion(2, 2, 65)}{this.checkPostion(2, 3, 65)}{this.checkPostion(2, 4, 65)}
                  {this.checkPostion(3, 1, 65)}{this.checkPostion(3, 2, 65)}{this.checkPostion(3, 3, 65)}{this.checkPostion(3, 4, 65)}
                  {this.checkPostion(4, 1, 65)}{this.checkPostion(4, 2, 65)}{this.checkPostion(4, 3, 65)}{this.checkPostion(4, 4, 65)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 25)}{this.checkPostion(1, 2, 25)}{this.checkPostion(1, 3, 25)}{this.checkPostion(1, 4, 25)}
                  {this.checkPostion(2, 1, 25)}{this.checkPostion(2, 2, 25)}{this.checkPostion(2, 3, 25)}{this.checkPostion(2, 4, 25)}
                  {this.checkPostion(3, 1, 25)}{this.checkPostion(3, 2, 25)}{this.checkPostion(3, 3, 25)}{this.checkPostion(3, 4, 25)}
                  {this.checkPostion(4, 1, 25)}{this.checkPostion(4, 2, 25)}{this.checkPostion(4, 3, 25)}{this.checkPostion(4, 4, 25)}
                </View>
              </View>
              <View style={[row.Style, { borderRightWidth: 2 }]}>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 31)}{this.checkPostion(1, 2, 31)}{this.checkPostion(1, 3, 31)}{this.checkPostion(1, 4, 31)}
                  {this.checkPostion(2, 1, 31)}{this.checkPostion(2, 2, 31)}{this.checkPostion(2, 3, 31)}{this.checkPostion(2, 4, 31)}
                  {this.checkPostion(3, 1, 31)}{this.checkPostion(3, 2, 31)}{this.checkPostion(3, 3, 31)}{this.checkPostion(3, 4, 31)}
                  {this.checkPostion(4, 1, 31)}{this.checkPostion(4, 2, 31)}{this.checkPostion(4, 3, 31)}{this.checkPostion(4, 4, 31)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 30)}{this.checkPostion(1, 2, 30)}{this.checkPostion(1, 3, 30)}{this.checkPostion(1, 4, 30)}
                  {this.checkPostion(2, 1, 30)}{this.checkPostion(2, 2, 30)}{this.checkPostion(2, 3, 30)}{this.checkPostion(2, 4, 30)}
                  {this.checkPostion(3, 1, 30)}{this.checkPostion(3, 2, 30)}{this.checkPostion(3, 3, 30)}{this.checkPostion(3, 4, 30)}
                  {this.checkPostion(4, 1, 30)}{this.checkPostion(4, 2, 30)}{this.checkPostion(4, 3, 30)}{this.checkPostion(4, 4, 30)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 29)}{this.checkPostion(1, 2, 29)}{this.checkPostion(1, 3, 29)}{this.checkPostion(1, 4, 29)}
                  {this.checkPostion(2, 1, 29)}{this.checkPostion(2, 2, 29)}{this.checkPostion(2, 3, 29)}{this.checkPostion(2, 4, 29)}
                  {this.checkPostion(3, 1, 29)}{this.checkPostion(3, 2, 29)}{this.checkPostion(3, 3, 29)}{this.checkPostion(3, 4, 29)}
                  {this.checkPostion(4, 1, 29)}{this.checkPostion(4, 2, 29)}{this.checkPostion(4, 3, 29)}{this.checkPostion(4, 4, 29)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 28)}{this.checkPostion(1, 2, 28)}{this.checkPostion(1, 3, 28)}{this.checkPostion(1, 4, 28)}
                  {this.checkPostion(2, 1, 28)}{this.checkPostion(2, 2, 28)}{this.checkPostion(2, 3, 28)}{this.checkPostion(2, 4, 28)}
                  {this.checkPostion(3, 1, 28)}{this.checkPostion(3, 2, 28)}{this.checkPostion(3, 3, 28)}{this.checkPostion(3, 4, 28)}
                  {this.checkPostion(4, 1, 28)}{this.checkPostion(4, 2, 28)}{this.checkPostion(4, 3, 28)}{this.checkPostion(4, 4, 28)}
                </View>
                <View style={[styles.item, styles.orange, { backgroundColor: "#F5C601" }]}>
                  <FontAwesome name="star" size={20} color={"white"} style={{ position: "absolute", left: 2 }} />
                  {this.checkPostion(1, 1, 27)}{this.checkPostion(1, 2, 27)}{this.checkPostion(1, 3, 27)}{this.checkPostion(1, 4, 27)}
                  {this.checkPostion(2, 1, 27)}{this.checkPostion(2, 2, 27)}{this.checkPostion(2, 3, 27)}{this.checkPostion(2, 4, 27)}
                  {this.checkPostion(3, 1, 27)}{this.checkPostion(3, 2, 27)}{this.checkPostion(3, 3, 27)}{this.checkPostion(3, 4, 27)}
                  {this.checkPostion(4, 1, 27)}{this.checkPostion(4, 2, 27)}{this.checkPostion(4, 3, 27)}{this.checkPostion(4, 4, 27)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 26)}{this.checkPostion(1, 2, 26)}{this.checkPostion(1, 3, 26)}{this.checkPostion(1, 4, 26)}
                  {this.checkPostion(2, 1, 26)}{this.checkPostion(2, 2, 26)}{this.checkPostion(2, 3, 26)}{this.checkPostion(2, 4, 26)}
                  {this.checkPostion(3, 1, 26)}{this.checkPostion(3, 2, 26)}{this.checkPostion(3, 3, 26)}{this.checkPostion(3, 4, 26)}
                  {this.checkPostion(4, 1, 26)}{this.checkPostion(4, 2, 26)}{this.checkPostion(4, 3, 26)}{this.checkPostion(4, 4, 26)}
                </View>
              </View>
            </View>
          </View>
          {/* =============================== Lowest Part ============================= */}
          <View style={row.Style}>
            <View>
              <View style={[Players.styles, { marginLeft: Dimensions.get("window").width / 50, borderRightWidth: 1 }]}>
                <View style={{ width: '100%', height: '102%', top: -1, backgroundColor: "#1088D6" }}>
                  <View style={styles.homeContainer}>
                    <View style={row.Style}>
                      <View style={styles.places}>
                        <TouchableOpacity >
                          {this.checkPostion(4, 1, -14)}
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.places, { marginLeft: 90 }]}>
                        <TouchableOpacity >
                          {this.checkPostion(4, 2, -24)}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={row.Style}>
                      <View style={[styles.places, { marginTop: 80 }]}>
                        <TouchableOpacity >
                          {this.checkPostion(4, 3, -34)}
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.places, { marginLeft: 90, marginTop: 80 }]}>
                        <TouchableOpacity >
                          {this.checkPostion(4, 4, -44)}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ justifyContent: "center", top: 90, alignItems: "center" }}>
                      <Text style={{ position: "absolute", color: "white", fontWeight: "bold", fontStyle: "italic", fontSize: 15 }}>Player 4</Text>
                    </View>
                  </View>
                </View>

              </View>
              {this.state.noOfPlayer > 2 ? <TouchableOpacity style={styles.diceBox4} disabled={this.state.noOfPlayer === 2 ? true : this.state.turn4 === false ? true : false} onPress={() => this.rollDiceFor4th()}>
                {this.state.noOfPlayer != 2 && this.state.showDiceroll4 === false ?
                  <Image style={{ width: 45, height: 45, top: -7 }} source={this.state.image4} /> :
                  this.state.noOfPlayer != 2 && this.state.showDiceroll4 === true ?
                    <View>
                      <Image source={require('../assets/diceroll.gif')} style={{ width: 70, height: 70, top: -10, left: -2 }} />
                    </View> :
                    <Image style={{ width: 90, height: 70, marginLeft: 30, marginTop: 10 }} />}
              </TouchableOpacity> : <View style={{ height: 60, width: 60, marginBottom: 20 }}></View>}
              {this.state.noOfPlayer === 3 && this.state.turn4 && (this.state.isMovedBy2 || this.checkIfAnythingOpened(2)) ?
                <Image style={styles.pointer2} source={require('../assets/arrowanimation.gif')} /> :
                this.state.noOfPlayer === 4 && this.state.turn4 && (this.state.isMovedBy3 || this.checkIfAnythingOpened(3)) ?
                  <Image style={styles.pointer2} source={require('../assets/arrowanimation.gif')} /> : null}
            </View>
            <View style={row.Style}>
              <View style={styles.first}>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 44)}{this.checkPostion(1, 2, 44)}{this.checkPostion(1, 3, 44)}{this.checkPostion(1, 4, 44)}
                  {this.checkPostion(2, 1, 44)}{this.checkPostion(2, 2, 44)}{this.checkPostion(2, 3, 44)}{this.checkPostion(2, 4, 44)}
                  {this.checkPostion(3, 1, 44)}{this.checkPostion(3, 2, 44)}{this.checkPostion(3, 3, 44)}{this.checkPostion(3, 4, 44)}
                  {this.checkPostion(4, 1, 44)}{this.checkPostion(4, 2, 44)}{this.checkPostion(4, 3, 44)}{this.checkPostion(4, 4, 44)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 43)}{this.checkPostion(1, 2, 43)}{this.checkPostion(1, 3, 43)}{this.checkPostion(1, 4, 43)}
                  {this.checkPostion(2, 1, 43)}{this.checkPostion(2, 2, 43)}{this.checkPostion(2, 3, 43)}{this.checkPostion(2, 4, 43)}
                  {this.checkPostion(3, 1, 43)}{this.checkPostion(3, 2, 43)}{this.checkPostion(3, 3, 43)}{this.checkPostion(3, 4, 43)}
                  {this.checkPostion(4, 1, 43)}{this.checkPostion(4, 2, 43)}{this.checkPostion(4, 3, 43)}{this.checkPostion(4, 4, 43)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 42)}{this.checkPostion(1, 2, 42)}{this.checkPostion(1, 3, 42)}{this.checkPostion(1, 4, 42)}
                  {this.checkPostion(2, 1, 42)}{this.checkPostion(2, 2, 42)}{this.checkPostion(2, 3, 42)}{this.checkPostion(2, 4, 42)}
                  {this.checkPostion(3, 1, 42)}{this.checkPostion(3, 2, 42)}{this.checkPostion(3, 3, 42)}{this.checkPostion(3, 4, 42)}
                  {this.checkPostion(4, 1, 42)}{this.checkPostion(4, 2, 42)}{this.checkPostion(4, 3, 42)}{this.checkPostion(4, 4, 42)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 41)}{this.checkPostion(1, 2, 41)}{this.checkPostion(1, 3, 41)}{this.checkPostion(1, 4, 41)}
                  {this.checkPostion(2, 1, 41)}{this.checkPostion(2, 2, 41)}{this.checkPostion(2, 3, 41)}{this.checkPostion(2, 4, 41)}
                  {this.checkPostion(3, 1, 41)}{this.checkPostion(3, 2, 41)}{this.checkPostion(3, 3, 41)}{this.checkPostion(3, 4, 41)}
                  {this.checkPostion(4, 1, 41)}{this.checkPostion(4, 2, 41)}{this.checkPostion(4, 3, 41)}{this.checkPostion(4, 4, 41)}
                </View>
                <View style={[styles.item, styles.blue, { backgroundColor: "#1088D6" }]}>
                  <FontAwesome name="star" size={20} color={"white"} style={{ position: "absolute", left: 2 }} />
                  {this.checkPostion(1, 1, 40)}{this.checkPostion(1, 2, 40)}{this.checkPostion(1, 3, 40)}{this.checkPostion(1, 4, 40)}
                  {this.checkPostion(2, 1, 40)}{this.checkPostion(2, 2, 40)}{this.checkPostion(2, 3, 40)}{this.checkPostion(2, 4, 40)}
                  {this.checkPostion(3, 1, 40)}{this.checkPostion(3, 2, 40)}{this.checkPostion(3, 3, 40)}{this.checkPostion(3, 4, 40)}
                  {this.checkPostion(4, 1, 40)}{this.checkPostion(4, 2, 40)}{this.checkPostion(4, 3, 40)}{this.checkPostion(4, 4, 40)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 39)}{this.checkPostion(1, 2, 39)}{this.checkPostion(1, 3, 39)}{this.checkPostion(1, 4, 39)}
                  {this.checkPostion(2, 1, 39)}{this.checkPostion(2, 2, 39)}{this.checkPostion(2, 3, 39)}{this.checkPostion(2, 4, 39)}
                  {this.checkPostion(3, 1, 39)}{this.checkPostion(3, 2, 39)}{this.checkPostion(3, 3, 39)}{this.checkPostion(3, 4, 39)}
                  {this.checkPostion(4, 1, 39)}{this.checkPostion(4, 2, 39)}{this.checkPostion(4, 3, 39)}{this.checkPostion(4, 4, 39)}
                </View>
              </View>
              <View style={styles.second}>
                <View style={[styles.item, styles.blue, { marginTop: -25, borderColor: "#1088D6" }]}>
                  {this.checkPostion(1, 1, 76)}{this.checkPostion(1, 2, 76)}{this.checkPostion(1, 3, 76)}{this.checkPostion(1, 4, 76)}
                  {this.checkPostion(2, 1, 76)}{this.checkPostion(2, 2, 76)}{this.checkPostion(2, 3, 76)}{this.checkPostion(2, 4, 76)}
                  {this.checkPostion(3, 1, 76)}{this.checkPostion(3, 2, 76)}{this.checkPostion(3, 3, 76)}{this.checkPostion(3, 4, 76)}
                  {this.checkPostion(4, 1, 76)}{this.checkPostion(4, 2, 76)}{this.checkPostion(4, 3, 76)}{this.checkPostion(4, 4, 76)}
                </View>
                <View style={[styles.item, styles.blue]}>
                  {this.checkPostion(1, 1, 75)}{this.checkPostion(1, 2, 75)}{this.checkPostion(1, 3, 75)}{this.checkPostion(1, 4, 75)}
                  {this.checkPostion(2, 1, 75)}{this.checkPostion(2, 2, 75)}{this.checkPostion(2, 3, 75)}{this.checkPostion(2, 4, 75)}
                  {this.checkPostion(3, 1, 75)}{this.checkPostion(3, 2, 75)}{this.checkPostion(3, 3, 75)}{this.checkPostion(3, 4, 75)}
                  {this.checkPostion(4, 1, 75)}{this.checkPostion(4, 2, 75)}{this.checkPostion(4, 3, 75)}{this.checkPostion(4, 4, 75)}
                </View>
                <View style={[styles.item, styles.blue]}>
                  {this.checkPostion(1, 1, 74)}{this.checkPostion(1, 2, 74)}{this.checkPostion(1, 3, 74)}{this.checkPostion(1, 4, 74)}
                  {this.checkPostion(2, 1, 74)}{this.checkPostion(2, 2, 74)}{this.checkPostion(2, 3, 74)}{this.checkPostion(2, 4, 74)}
                  {this.checkPostion(3, 1, 74)}{this.checkPostion(3, 2, 74)}{this.checkPostion(3, 3, 74)}{this.checkPostion(3, 4, 74)}
                  {this.checkPostion(4, 1, 74)}{this.checkPostion(4, 2, 74)}{this.checkPostion(4, 3, 74)}{this.checkPostion(4, 4, 74)}
                </View>
                <View style={[styles.item, styles.blue]}>
                  {this.checkPostion(1, 1, 73)}{this.checkPostion(1, 2, 73)}{this.checkPostion(1, 3, 73)}{this.checkPostion(1, 4, 73)}
                  {this.checkPostion(2, 1, 73)}{this.checkPostion(2, 2, 73)}{this.checkPostion(2, 3, 73)}{this.checkPostion(2, 4, 73)}
                  {this.checkPostion(3, 1, 73)}{this.checkPostion(3, 2, 73)}{this.checkPostion(3, 3, 73)}{this.checkPostion(3, 4, 73)}
                  {this.checkPostion(4, 1, 73)}{this.checkPostion(4, 2, 73)}{this.checkPostion(4, 3, 73)}{this.checkPostion(4, 4, 73)}
                </View>
                <View style={[styles.item, styles.blue]}>
                  {this.checkPostion(1, 1, 72)}{this.checkPostion(1, 2, 72)}{this.checkPostion(1, 3, 72)}{this.checkPostion(1, 4, 72)}
                  {this.checkPostion(2, 1, 72)}{this.checkPostion(2, 2, 72)}{this.checkPostion(2, 3, 72)}{this.checkPostion(2, 4, 72)}
                  {this.checkPostion(3, 1, 72)}{this.checkPostion(3, 2, 72)}{this.checkPostion(3, 3, 72)}{this.checkPostion(3, 4, 72)}
                  {this.checkPostion(4, 1, 72)}{this.checkPostion(4, 2, 72)}{this.checkPostion(4, 3, 72)}{this.checkPostion(4, 4, 72)}
                </View>
                <View style={[styles.item, styles.blue]}>
                  {this.checkPostion(1, 1, 71)}{this.checkPostion(1, 2, 71)}{this.checkPostion(1, 3, 71)}{this.checkPostion(1, 4, 71)}
                  {this.checkPostion(2, 1, 71)}{this.checkPostion(2, 2, 71)}{this.checkPostion(2, 3, 71)}{this.checkPostion(2, 4, 71)}
                  {this.checkPostion(3, 1, 71)}{this.checkPostion(3, 2, 71)}{this.checkPostion(3, 3, 71)}{this.checkPostion(3, 4, 71)}
                  {this.checkPostion(4, 1, 71)}{this.checkPostion(4, 2, 71)}{this.checkPostion(4, 3, 71)}{this.checkPostion(4, 4, 71)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 38)}{this.checkPostion(1, 2, 38)}{this.checkPostion(1, 3, 38)}{this.checkPostion(1, 4, 38)}
                  {this.checkPostion(2, 1, 38)}{this.checkPostion(2, 2, 38)}{this.checkPostion(2, 3, 38)}{this.checkPostion(2, 4, 38)}
                  {this.checkPostion(3, 1, 38)}{this.checkPostion(3, 2, 38)}{this.checkPostion(3, 3, 38)}{this.checkPostion(3, 4, 38)}
                  {this.checkPostion(4, 1, 38)}{this.checkPostion(4, 2, 38)}{this.checkPostion(4, 3, 38)}{this.checkPostion(4, 4, 38)}
                </View>
              </View>
              <View style={styles.third}>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 32)}{this.checkPostion(1, 2, 32)}{this.checkPostion(1, 3, 32)}{this.checkPostion(1, 4, 32)}
                  {this.checkPostion(2, 1, 32)}{this.checkPostion(2, 2, 32)}{this.checkPostion(2, 3, 32)}{this.checkPostion(2, 4, 32)}
                  {this.checkPostion(3, 1, 32)}{this.checkPostion(3, 2, 32)}{this.checkPostion(3, 3, 32)}{this.checkPostion(3, 4, 32)}
                  {this.checkPostion(4, 1, 32)}{this.checkPostion(4, 2, 32)}{this.checkPostion(4, 3, 32)}{this.checkPostion(4, 4, 32)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 33)}{this.checkPostion(1, 2, 33)}{this.checkPostion(1, 3, 33)}{this.checkPostion(1, 4, 33)}
                  {this.checkPostion(2, 1, 33)}{this.checkPostion(2, 2, 33)}{this.checkPostion(2, 3, 33)}{this.checkPostion(2, 4, 33)}
                  {this.checkPostion(3, 1, 33)}{this.checkPostion(3, 2, 33)}{this.checkPostion(3, 3, 33)}{this.checkPostion(3, 4, 33)}
                  {this.checkPostion(4, 1, 33)}{this.checkPostion(4, 2, 33)}{this.checkPostion(4, 3, 33)}{this.checkPostion(4, 4, 33)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 34)}{this.checkPostion(1, 2, 34)}{this.checkPostion(1, 3, 34)}{this.checkPostion(1, 4, 34)}
                  {this.checkPostion(2, 1, 34)}{this.checkPostion(2, 2, 34)}{this.checkPostion(2, 3, 34)}{this.checkPostion(2, 4, 34)}
                  {this.checkPostion(3, 1, 34)}{this.checkPostion(3, 2, 34)}{this.checkPostion(3, 3, 34)}{this.checkPostion(3, 4, 34)}
                  {this.checkPostion(4, 1, 34)}{this.checkPostion(4, 2, 34)}{this.checkPostion(4, 3, 34)}{this.checkPostion(4, 4, 34)}
                </View>
                <View style={[styles.item, { backgroundColor: "#1088D6" }]}>
                  <FontAwesome name="star" size={20} color={"white"} style={{ position: "absolute", left: 2 }} />
                  {this.checkPostion(1, 1, 35)}{this.checkPostion(1, 2, 35)}{this.checkPostion(1, 3, 35)}{this.checkPostion(1, 4, 35)}
                  {this.checkPostion(2, 1, 35)}{this.checkPostion(2, 2, 35)}{this.checkPostion(2, 3, 35)}{this.checkPostion(2, 4, 35)}
                  {this.checkPostion(3, 1, 35)}{this.checkPostion(3, 2, 35)}{this.checkPostion(3, 3, 35)}{this.checkPostion(3, 4, 35)}
                  {this.checkPostion(4, 1, 35)}{this.checkPostion(4, 2, 35)}{this.checkPostion(4, 3, 35)}{this.checkPostion(4, 4, 35)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 36)}{this.checkPostion(1, 2, 36)}{this.checkPostion(1, 3, 36)}{this.checkPostion(1, 4, 36)}
                  {this.checkPostion(2, 1, 36)}{this.checkPostion(2, 2, 36)}{this.checkPostion(2, 3, 36)}{this.checkPostion(2, 4, 36)}
                  {this.checkPostion(3, 1, 36)}{this.checkPostion(3, 2, 36)}{this.checkPostion(3, 3, 36)}{this.checkPostion(3, 4, 36)}
                  {this.checkPostion(4, 1, 36)}{this.checkPostion(4, 2, 36)}{this.checkPostion(4, 3, 36)}{this.checkPostion(4, 4, 36)}
                </View>
                <View style={styles.item}>
                  {this.checkPostion(1, 1, 37)}{this.checkPostion(1, 2, 37)}{this.checkPostion(1, 3, 37)}{this.checkPostion(1, 4, 37)}
                  {this.checkPostion(2, 1, 37)}{this.checkPostion(2, 2, 37)}{this.checkPostion(2, 3, 37)}{this.checkPostion(2, 4, 37)}
                  {this.checkPostion(3, 1, 37)}{this.checkPostion(3, 2, 37)}{this.checkPostion(3, 3, 37)}{this.checkPostion(3, 4, 37)}
                  {this.checkPostion(4, 1, 37)}{this.checkPostion(4, 2, 37)}{this.checkPostion(4, 3, 37)}{this.checkPostion(4, 4, 37)}
                </View>
              </View>
            </View>
            <View>
              <View style={[Players.styles, { borderWidth: 1, borderColor: "black" }]}>
                <View style={{ width: '100%', height: '100%', backgroundColor: "#F5C601" }}>
                  <View style={styles.homeContainer}>
                    <View style={row.Style}>
                      <View style={styles.places}>
                        <TouchableOpacity >
                          {this.checkPostion(3, 1, -13)}
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.places, { marginLeft: 90 }]}>
                        <TouchableOpacity >
                          {this.checkPostion(3, 2, -23)}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={row.Style}>
                      <View style={[styles.places, { marginTop: 80 }]}>
                        <TouchableOpacity >
                          {this.checkPostion(3, 3, -33)}
                        </TouchableOpacity>
                      </View>
                      <View style={[styles.places, { marginLeft: 90, marginTop: 80 }]}>
                        <TouchableOpacity >
                          {this.checkPostion(3, 4, -43)}
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={{ justifyContent: "center", top: 90, alignItems: "center" }}>
                      <Text style={{ position: "absolute", color: "white", fontWeight: "bold", fontStyle: "italic", fontSize: 15 }}>Player 3</Text>
                    </View>
                  </View>

                </View>
              </View>
              {this.state.noOfPlayer !== 3 ? <TouchableOpacity style={styles.diceBox3} disabled={this.state.noOfPlayer === 3 ? true : this.state.turn3 === false ? true : false} onPress={() => this.rollDiceFor3rd()}>
                {this.state.noOfPlayer != 3 && this.state.showDiceroll3 === false ? <Image style={{ width: 45, height: 45, top: -7 }} source={this.state.image3} /> :
                  this.state.noOfPlayer != 3 && this.state.showDiceroll3 === true ?
                    <View>
                      <Image source={require('../assets/diceroll.gif')} style={{ width: 70, height: 70, top: -10, left: -2 }} />
                    </View> :
                    <Image style={{ width: 90, height: 70, marginLeft: 30, marginTop: 10 }} />}
              </TouchableOpacity> : <View style={{ height: 60, width: 60, marginBottom: 20 }}></View>}
              {this.state.noOfPlayer === 2 && this.state.turn3 && (this.state.isMovedBy1 || this.checkIfAnythingOpened(1)) ?
                <Image style={styles.pointer2} source={require('../assets/arrowanimation.gif')} /> :
                this.state.noOfPlayer === 4 && this.state.turn3 && (this.state.isMovedBy2 || this.checkIfAnythingOpened(2)) ?
                  <Image style={styles.pointer2} source={require('../assets/arrowanimation.gif')} /> : null}
            </View>
          </View>
          <View style={styles.message}>
            <Text style={{ color: "red", fontSize: 30, marginLeft: 60, marginTop: 20 }}> {this.state.turnMessage} {this.state.moveMessage} </Text>
          </View>
        </View>:null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  red: {
    backgroundColor: "#D43230"
  },
  green: {
    backgroundColor: "#229746",
  },
  orange: {
    backgroundColor: "#F5C601"
  },
  item: {
    borderWidth: 1,
    borderColor: "black",
    width: Dimensions.get("window").width * 6.4 / 100,
    height: Dimensions.get("window").width * 6.4 / 100,
    backgroundColor: "white",
    // position:"absolute"
    // justifyContent:"center",
    // alignItems:"center",
    // textAlign:"center"
  },
  First: {
    flexDirection: "column",
    marginLeft: Dimensions.get("window").width / 50,
    left: -0.6
  },
  wholeSetup: {
    marginTop: 70,
    top: 65,
    // transform: [{ rotate: '180deg' }],
  },
  winnerZone: {
    borderWidth: 4,
    borderLeftColor: "red",
    borderTopColor: "green",
    borderRightColor: "orange",
    borderBottomColor: "blue",
    width: Dimensions.get("window").width * 19.2 / 100,
    height: Dimensions.get("window").width * 19.2 / 100
    , flexDirection: "row"
  },
  blue: {
    backgroundColor: "#1088D6"
  },
  places: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "#B9B1B1",
    left: 10,
    marginRight: -70,
    marginBottom: -90,
    bottom: 20,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 23,
    paddingBottom: 18,
  },
  icons: {
    height: 35,
    width: 35,
    left: 9,
    top: 11,
    zIndex:-1
    // color:"black"
  },
  iconss: {
    height: 58,
    width: 35,
    left: 15,
    top: 5,
    // color:"black"
  },
  red_position: {
    position: 'absolute',
    top: -20,
    left: -14,
    // zIndex:1
  },
  green_position: {
    position: 'absolute',
    top: -20,
    left: -14,
  },
  yellow_position: {
    position: 'absolute',
    top: -20,
    left: -14,
  },
  blue_position: {
    position: 'absolute',
    top: -20,
    left: -14,
  },
  homeContainer: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    top: 23,
    left: 23,
    borderRadius: 20
  },
  diceBox1: {
    width: 60,
    height: 60,
    marginLeft: 50,
    backgroundColor: "white",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center",
    borderColor: "#D43230",
    paddingTop: 15,
    borderWidth: 4
  },
  diceBox2: {
    width: 60,
    height: 60,
    marginLeft: 50,
    backgroundColor: "white",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center",
    borderColor: "#229746",
    paddingTop: 15,
    borderWidth: 3
  },
  diceBox3: {
    width: 60,
    height: 60,
    marginLeft: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center",
    borderColor: "#F5C601",
    paddingTop: 15,
    borderWidth: 3,
    top: 20
  },
  diceBox4: {
    width: 60,
    height: 60,
    marginLeft: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: 'center',
    textAlign: "center",
    borderColor: "#1088D6",
    paddingTop: 15,
    borderWidth: 3,
    top: 20
  },
  pointer1: {
    // position:'absolute',
    width: 70,
    height: 70,
    transform: [{ rotate: '90deg' }],
    top: -65,
    left: 45,
    marginBottom: -70
  },
  pointer2: {
    // position:'absolute',
    width: 70,
    height: 70,
    transform: [{ rotate: '270deg' }],
    top: 15,
    left: 50,
  },
  animatedIcons: {
    height: 170,
    width: 170,
    left: -50,
    top: -47,
    zIndex: 1
  },
  startButton: {
    width: 100,
    marginLeft: 35,
    alignItems: 'center',
    backgroundColor: '#017C0E',
    borderWidth: 1,
    borderColor: '#F5C601',
    height: 45,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    marginTop: -80,
    top: 120,
    left: -20
  },
  container1: {
    width: 300,
    height: 400,
    backgroundColor: "#391C1C",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#8D8E4E",
    // justifyContent:"center",
    alignItems: "center",
    top: 230,
    left: 45,
    paddingTop: 30,
    position: 'absolute',
    zIndex: 1000
  },
});