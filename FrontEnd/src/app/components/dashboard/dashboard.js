import React, { Component, Fragment } from "react";
import { Link, withRouter  } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import TopNavDashboard from '../dashboard/topNavDashboard';
import { loginUser } from "../../../redux/actions/authActions";

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
//import { stat } from "fs";
import {getTweetsWithViews,getTweetsWithLikes,getTweetsWithRetweets,getTweetsFrequencyWiseDaily,getTweetsFrequencyWiseMonthly,getTweetsFrequencyWiseHourly,getTweetsWithProfileViews} from "../../../redux/actions/dashboardActions"; 


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };

  }
  
  componentWillMount(){
    this.props.getTweetsWithViews();
    this.props.getTweetsWithLikes();
    this.props.getTweetsWithRetweets();
    this.props.getTweetsFrequencyWiseDaily();
    this.props.getTweetsFrequencyWiseMonthly();
    this.props.getTweetsFrequencyWiseHourly();
    this.props.getTweetsWithProfileViews();
  }

  componentWillReceiveProps(nextProps) {

    /*if (nextProps.auth.isAuthenticated) {

      //document.body.classList.remove("t-login-body");
      //document.body.classList.remove("t-sign-up-body"); 
       nextProps.history.push("/ui");
      
    }*/

    if (nextProps.errors.hasOwnProperty("success")) {
      /*this.setState({
        errors: nextProps.errors
      });*/
      
      document.getElementById('login-msg-box').style.display="block";
                     document.getElementById('login-msg-box').className = 'alert-danger mt-1 p-1 t-font-size-16';
                     document.getElementById('login-msg-box').innerHTML    = nextProps.errors.msg;
    }
    else{
      document.getElementById('login-msg-box').style.display="none";
    }
  }

  componentDidMount() {

    if(Object.keys(this.props.success).length!=0){
      
      document.getElementById('login-msg-box').style.display = "block";
      document.getElementById('login-msg-box').className = 'alert-success mt-1 p-1 t-font-size-16';
      document.getElementById('login-msg-box').innerHTML = this.props.success.msg;
    }
    else{
      //document.getElementById('login-msg-box').style.display="none";
    }
    
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (!this.props.auth.isAuthenticated) {
      
         //document.body.classList.remove("t-login-body");
          this.props.history.push("/login");
         
     }

  }
  
  onChange = e => {
  
    this.setState({ [e.target.id]: e.target.value });
    document.getElementById('login-msg-box').style.display="none";
  };
  

  render() {
    const { errors } = this.state;

    /*const a = [ { name: 'Clair.Leuschke36',
    y: 1000,
    sliced: true,
    selected: true },
  { name: 'Josephine.Hermann87', y: 900 },
  { name: 'Amelie_Goldner', y: 875 },
  { name: 'Landen61', y: 779 },
  { name: 'Allan_Stamm', y: 500 },
  { name: 'Filiberto69', y: 500 },
  { name: 'Ignatius10', y: 399 },
  { name: 'Floyd0', y: 349 },
  { name: 'Arno.Rempel73', y: 150 },
  { name: 'Arlie.Hickle', y: 100 } ];*/

    const optionsForViews = {
      chart: {
        type: 'pie',
        backgroundColor : '#15202b'
       
      },
      title: {
        text: 'Top 10 tweets on basis of Views Count',
        style: {
          color: '#ffffff',
          font: 'bold 16px'
       }
      },
      
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      credits: {
        enabled: false
     },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    legend: {
      //backgroundColor: 'rgba(0, 0, 0, 0.5)',
      itemStyle: {
          color: '#E0E0E3'
      },
      itemHoverStyle: {
          color: '#FFF'
      },
      itemHiddenStyle: {
          color: '#606063'
      },
      title: {
          style: {
              color: '#C0C0C0'
          }
      }
  },
      series: [{
        name: 'Tweets',
        colorByPoint: true,
        data: this.props.tweetsWithViews.arr
    }]
    };

    const optionsForLikes = {
      chart: {
        type: 'pie',
        backgroundColor : '#15202b'
       
      },
      title: {
        text: 'Top 10 tweets on basis of Likes',
        style: {
          color: '#ffffff',
          font: 'bold 16px'
       }
      },
      
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      credits: {
        enabled: false
     },
      plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    legend: {
      //backgroundColor: 'rgba(0, 0, 0, 0.5)',
      itemStyle: {
          color: '#E0E0E3'
      },
      itemHoverStyle: {
          color: '#FFF'
      },
      itemHiddenStyle: {
          color: '#606063'
      },
      title: {
          style: {
              color: '#C0C0C0'
          }
      }
  },
      series: [{
        name: 'Tweets',
        colorByPoint: true,
        data: this.props.tweetsWithLikes.arr
    }]
    };

    
    //Options for Retweets
    const optionsForRetweets = {
      colors: ['#3EB703','#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        type: 'column',
        backgroundColor : '#15202b',
        style: {
          fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
    },
    title: {
      text: 'Top 5 tweets on basis of Retweets',
      style: {
        color: '#ffffff',
        font: 'bold 16px'
     }
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                color: '#ffffff'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Tweets',
            style: {
              color: '#ffffff',
              font: 'bold 16px'
           }
        }
    },
    legend: {
        enabled: false
    },
    credits: {
      enabled: false
   },
    tooltip: {
        pointFormat: 'Tweets <b>{point.y:.0f}</b>'
    },
    series: [{
        name: 'handle',
        data: this.props.tweetsWithRetweets.arr,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]



    };



    //Options for Hourly
    const optionsForTweetsHourly = {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        type: 'column',
        backgroundColor : '#15202b',
        style: {
          fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
    },
    title: {
      text: 'Number of Tweets Hourly',
      style: {
        color: '#ffffff',
        font: 'bold 16px'
     }
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                color: '#ffffff'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Tweets',
            style: {
              color: '#ffffff',
              font: 'bold 16px'
           }
        }
    },
    legend: {
        enabled: false
    },
    credits: {
      enabled: false
   },
    tooltip: {
        pointFormat: 'Tweets <b>{point.y:.0f}</b>'
    },
    series: [{
        name: 'handle',
        data: this.props.tweetsFrequencyWiseHourly.arr,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]



    };
    

    //Options for Tweets Monthly
    const optionsForTweetsMonthly = {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        type: 'column',
        backgroundColor : '#15202b',
        style: {
          fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
    },
    title: {
      text: 'Number of Tweets Monthly',
      style: {
        color: '#ffffff',
        font: 'bold 16px'
     }
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                color: '#ffffff'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Tweets',
            style: {
              color: '#ffffff',
              font: 'bold 16px'
           }
        }
    },
    legend: {
        enabled: false
    },
    credits: {
      enabled: false
   },
    tooltip: {
        pointFormat: 'Tweets <b>{point.y:.0f}</b>'
    },
    series: [{
        name: 'handle',
        data: this.props.tweetsFrequencyWiseMonthly.arr,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]



    };

    //Options for Tweets Daily
    const optionsForTweetsDaily = {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        type: 'column',
        backgroundColor : '#15202b',
        style: {
          fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
    },
    title: {
      text: 'Number of Tweets Daily',
      style: {
        color: '#ffffff',
        font: 'bold 16px'
     }
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                color: '#ffffff'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Tweets',
            style: {
              color: '#ffffff',
              font: 'bold 16px'
           }
        }
    },
    legend: {
        enabled: false
    },
    credits: {
      enabled: false
   },
    tooltip: {
        pointFormat: 'Tweets <b>{point.y:.0f}</b>'
    },
    series: [{
        name: 'handle',
        data: this.props.tweetsFrequencyWiseDaily.arr,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]



    };


    //Options for Tweets Profile Views
    const optionsForProfileViews = {
      colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
        '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
      chart: {
        type: 'column',
        backgroundColor : '#15202b',
        style: {
          fontFamily: '\'Unica One\', sans-serif'
      },
      plotBorderColor: '#606063'
    },
    title: {
      text: 'Number of Profile Views',
      style: {
        color: '#ffffff',
        font: 'bold 16px'
     }
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif',
                color: '#ffffff'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Tweets',
            style: {
              color: '#ffffff',
              font: 'bold 16px'
           }
        }
    },
    legend: {
        enabled: false
    },
    credits: {
      enabled: false
   },
    tooltip: {
        pointFormat: 'Tweets <b>{point.y:.0f}</b>'
    },
    series: [{
        name: 'handle',
        data: this.props.tweetsWithProfileViews.arr,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]



    };
    
    return (
      <React.Fragment>
        <TopNavDashboard/>
        <h4 className="p-2 mt-2 text-center font-weight-bold">Dashboard</h4>
      <div className="container p-3 bg-black">
        <div className="row justify-content-center align-items-center h-100">
           <div className="col-md-12">

                <div className="row">
                <div className ="col-md-12 mx-auto p-3 border">
                  <h5 className="p-2" id="login-msg-box" style={{display:'none'}}></h5>  
                          
                              <div className="row" id="email-row">
                                     <div className="col-md-6">
                                        
                                         {/* <div id="tweets-with-views t-chart-style"></div> */}
                                         <HighchartsReact highcharts={Highcharts} options={optionsForViews} />
                                     </div>

                                     <div className="col-md-6">
                                        
                                         {/* <div id="tweets-with-views t-chart-style"></div> */}
                                         <HighchartsReact highcharts={Highcharts} options={optionsForLikes} />
                                     </div>

                                     

                              </div> 

                              <div className="row">
                                     <div className="col-md-12">
                                        
                                         {/* <div id="tweets-with-views t-chart-style"></div> */}
                                         <HighchartsReact highcharts={Highcharts} options={optionsForRetweets} />
                                     </div>                                     

                              </div>
                              
                              <div className="row">
                                     <div className="col-md-6">
                                         <HighchartsReact highcharts={Highcharts} options={optionsForTweetsHourly} />
                                     </div>
                                     <div className="col-md-6">
                                         <HighchartsReact highcharts={Highcharts} options={optionsForTweetsMonthly} />
                                     </div>                                     

                              </div>

                              <div className="row">
                                     
                                     <div className="col-md-12">
                                         <HighchartsReact highcharts={Highcharts} options={optionsForTweetsDaily} />
                                     </div>                                     

                              </div>

                              <div className="row">
                                     <div className="col-md-12">
                                        
                                         {/* <div id="tweets-with-views t-chart-style"></div> */}
                                         <HighchartsReact highcharts={Highcharts} options={optionsForProfileViews} />
                                     </div>                                     

                              </div>

                    </div>
                    
                                  

                </div>
            </div>
        </div>
      </div>
      </React.Fragment>
    );
  }

}


Dashboard.propTypes = {
  loginUser: PropTypes.func.isRequired,
  getTweetsWithViews: PropTypes.func.isRequired,
  getTweetsWithLikes: PropTypes.func.isRequired,
  getTweetsWithRetweets: PropTypes.func.isRequired,
  getTweetsWithFrequencyWiseDaily: PropTypes.func.isRequired,
  getTweetsWithFrequencyWiseMonthly: PropTypes.func.isRequired,
  getTweetsWithFrequencyWiseHourly: PropTypes.func.isRequired,
  getTweetsWithProfileViews: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  success: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success:state.success,
  tweetsWithViews : state.tweetsWithViews,
  tweetsWithLikes : state.tweetsWithLikes,
  tweetsWithRetweets : state.tweetsWithRetweets,
  tweetsFrequencyWiseDaily : state.tweetsFrequencyWiseDaily,
  tweetsFrequencyWiseMonthly : state.tweetsFrequencyWiseMonthly,
  tweetsFrequencyWiseHourly  : state.tweetsFrequencyWiseHourly,
  tweetsWithProfileViews         : state.tweetsWithProfileViews
});

export default connect(mapStateToProps,{loginUser,getTweetsWithViews,getTweetsWithLikes,getTweetsWithRetweets,getTweetsFrequencyWiseDaily,getTweetsFrequencyWiseMonthly,getTweetsFrequencyWiseHourly,getTweetsWithProfileViews})(withRouter(Dashboard));