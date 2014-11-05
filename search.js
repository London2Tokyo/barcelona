<!--
/* state = 1 - show element
   state = 0 - hide element
*/
function toggleDiv(divID, state){
    if(document.layers){ //netscape 4+

       document.layers[divID].visibility = state ? "show" : "hide";
       document.layers[divID].display = state ? "block" : "none";

    } else if(document.getElementById) { //netscape 6 internetExplorer 5+

        document.getElementById(divID).style.visibility = state ? "visible" : "hidden";
        document.getElementById(divID).style.display = state ? "block" : "none";

    } else {    //Internet Explorer 4

        document.all[divID].style.visibility = state ? "visible" : "hidden";
        document.all[divID].style.display = state ? "block" : "none";

    }
}

    function isBrowserSupp() {
        // Get the version of the browser
        version =  parseFloat( navigator.appVersion );

        if ( ( version >= 2.0 ) && ( version < 2.1 ) && ( navigator.appName.indexOf( "Netscape" ) != -1 ) ) {
            return false;
        } else {
            return true;
        }

        return true;
    }

    function isLeapYear( yrStr ) {
        var leapYear = false;
        var year = parseInt( yrStr, 10 );
        // every fourth year is a leap year
        if ( year % 4 == 0 ) {
            leapYear = true;
            // unless it's a multiple of 100
            if( year % 100 == 0 ) {
                leapYear = false;
                // unless it's a multiple of 400
                if( year % 400 == 0 ) {
                    leapYear=true;
                }
            }
        }
        return leapYear;
    }

    function getDaysInMonth( mthIdx, YrStr ) {
        // all the rest have 31
        var maxDays = 31
        // expect Feb. (of course)
        if( mthIdx == 1 ) {
            if( isLeapYear( YrStr ) ) {
                maxDays=29;
            } else {
                maxDays=28;
            }
        }

        // thirty days hath...
        if( mthIdx == 3 || mthIdx == 5 || mthIdx == 8 || mthIdx == 10 ) {
            maxDays=30;
        }
        return maxDays;
    }

    function displayHotel(){
        toggleDiv('hotelTable', 1);
        toggleDiv('carTable', 0);
        toggleDiv('flightTable', 0);
        toggleDiv('cruiseTable', 0);

        document.getElementById('air').checked=false;
        document.getElementById('car').checked=false;
        document.getElementById('hotel').checked=true;
        document.getElementById('cruise').checked=false;
	}

	function displayCar(){
        toggleDiv('hotelTable', 0);
        toggleDiv('carTable', 1);
        toggleDiv('flightTable', 0);
        toggleDiv('cruiseTable', 0);

        document.getElementById('air').checked=false;
        document.getElementById('car').checked=true;
        document.getElementById('hotel').checked=false;
        document.getElementById('cruise').checked=false;
	}

	function displayCruise(){
        toggleDiv('hotelTable', 0);
        toggleDiv('carTable', 0);
        toggleDiv('flightTable', 0);
        toggleDiv('cruiseTable', 1);

        document.getElementById('air').checked=false;
        document.getElementById('car').checked=false;
        document.getElementById('hotel').checked=false;
        document.getElementById('cruise').checked=true;
	}

	function displayFlight(){
        toggleDiv('hotelTable', 0);
        toggleDiv('carTable', 0);
        toggleDiv('flightTable', 1);
        toggleDiv('cruiseTable', 0);

        document.getElementById('air').checked=true;
        document.getElementById('car').checked=false;
        document.getElementById('hotel').checked=false;
        document.getElementById('cruise').checked=false;
	}

    //the function which does some magic to the date fields
    // return non-zero if it is the last day of the month
    function adjustDate( mthIdx, Dt ) {
        var value = 0;

        var today = new Date()
        var theYear = parseInt( today.getYear(), 10 )

        if( mthIdx < today.getMonth() ) {
            theYear = ( parseInt( today.getYear(), 10 ) + 1 )
        }
        if( theYear < 100 ) {
            theYear = "19" + theYear
        } else {
            if( ( theYear - 100 ) < 10 ) {
                theYear = "0" + ( theYear - 100 )
            } else {
                theYear = ( theYear - 100 ) + ""
            }
            theYear = "20" + theYear
        }


        var numDays = getDaysInMonth( mthIdx, theYear );

        if( mthIdx == 1 ) {
            if( Dt.options.selectedIndex + 1 < numDays ) {
                return 0;
            } else {
                Dt.options.selectedIndex=numDays - 1;
                //check for leap year
                if( numDays == 29 ) {
                    return 99;
                } else {
                    return 1;
                }
            }
        }

        if( Dt.options.selectedIndex + 1 < numDays ) {
            value = 0;
        } else {
            if ( Dt.options.selectedIndex + 1 > numDays ) {
                Dt.options.selectedIndex--;
                value = 3;
            } else {
                //index is 31 or 30
                value = 2;
            }
        }
        return value;
    }

    //changes departure month when arrival month is changed
    function amadChange( inM, inD, outM, outD ) {
        if ( !isBrowserSupp() ) {
            return;
        }

        var res = adjustDate( inM.options.selectedIndex, inD );
        if( res != 0 ) {
               outD.options.selectedIndex = 0;
               if ( outM.options.selectedIndex == 11 ) {
                    outM.options.selectedIndex = 0
               } else {
                    outM.options.selectedIndex=inM.options.selectedIndex + 1;
                    outD.options.selectedIndex = 1;
               }
        } else {
            outM.options.selectedIndex = inM.options.selectedIndex;
            if (outD.options.selectedIndex <= inD.options.selectedIndex) {
                outD.options.selectedIndex = inD.options.selectedIndex + 2;
            }
        }
        return;
    }


    function dmddChange( outM, outD ) {
        if ( !isBrowserSupp() ) {
            return;
        }

        adjustDate( outM.options.selectedIndex, outD );
        return;
    }



 function OpenWindow(file, name, width, height) {
        OpenWindow(file, name, width, height, false);
    }

    function OpenWindow(file, name, width, height, showLeftTopScrollbar) {
        var attr = "";
        if(showLeftTopScrollbar) {
            attr += "top=50,left=50,scrollbars=1,";
        }
        attr += "width=" + width + ",height=" + height + ",resizeable=1";
        window.open(file, name, attr);
    }

   function loadDefaultDates() {
        var airArrival = new Date();
        var airDeparture = new Date();
        var carArrival = new Date();
        var carDeparture = new Date();
        var hotelArrival = new Date();
        var hotelDeparture = new Date();

        var hotelAdvanceArrival = 21;
        var hotelAdvanceDeparture = 23;
        var carAdvanceArrival = 7;
        var carAdvanceDeparture = 8;
        var airAdvanceArrival = 14;
        var airAdvanceDeparture = 15;

        airArrival.setDate( airArrival.getDate() + airAdvanceArrival );
        airDeparture.setDate( airDeparture.getDate() + airAdvanceDeparture );
        carArrival.setDate( carArrival.getDate() + carAdvanceArrival );
        carDeparture.setDate( carDeparture.getDate() + carAdvanceDeparture );
        hotelArrival.setDate( hotelArrival.getDate() + hotelAdvanceArrival );
        hotelDeparture.setDate( hotelDeparture.getDate() + hotelAdvanceDeparture );

        document.forms['airForm'].departureMonth.value = airArrival.getMonth();
        document.forms['airForm'].returnMonth.value = airDeparture.getMonth();
        document.forms['airForm'].departureDay.value = airArrival.getDate();
        document.forms['airForm'].returnDay.value = airDeparture.getDate();

        document.forms['carForm'].pickUpMonth.value = carArrival.getMonth();
        document.forms['carForm'].dropOffMonth.value = carDeparture.getMonth();
        document.forms['carForm'].pickUpDay.value = carArrival.getDate();
        document.forms['carForm'].dropOffDay.value = carDeparture.getDate();

        document.forms['hotForm'].arrivalMonth.value = hotelArrival.getMonth();
        document.forms['hotForm'].departureMonth.value = hotelDeparture.getMonth();
        document.forms['hotForm'].arrivalDay.value = hotelArrival.getDate();
        document.forms['hotForm'].departureDay.value = hotelDeparture.getDate();

    }

    function validateDepWindow(formName) {
        if (document.forms[formName].tempDepTime[document.forms[formName].tempDepTime.selectedIndex].value==('M')) {
            window.document.forms[formName].tripWindow.value='5';
            window.document.forms[formName].departureTime.value='7AM';
        } else if (document.forms[formName].tempDepTime[document.forms[formName].tempDepTime.selectedIndex].value==('A')) {
            window.document.forms[formName].tripWindow.value='5';
            window.document.forms[formName].departureTime.value='3PM';
        } else if (document.forms[formName].tempDepTime[document.forms[formName].tempDepTime.selectedIndex].value==('E')) {
            window.document.forms[formName].tripWindow.value='5';
            window.document.forms[formName].departureTime.value='8PM';
        } else if(document.forms[formName].tempDepTime[document.forms[formName].tempDepTime.selectedIndex].value==('ANT')) {
            window.document.forms[formName].tripWindow.value='9';
            window.document.forms[formName].departureTime.value='12PM';
        } else {
            window.document.forms[formName].tripWindow.value='5';
            window.document.forms[formName].departureTime.value=document.forms[formName].tempDepTime.value;
        }
    }

    function validateRetWindow(formName) {
        if (document.forms[formName].tempRetTime[document.forms[formName].tempRetTime.selectedIndex].value==('M')) {
            window.document.forms[formName].returnTime.value='7AM';
        } else if (document.forms[formName].tempRetTime[document.forms[formName].tempRetTime.selectedIndex].value==('A')) {
            window.document.forms[formName].returnTime.value='3PM';
        } else if (document.forms[formName].tempRetTime[document.forms[formName].tempRetTime.selectedIndex].value==('E')) {
            window.document.forms[formName].returnTime.value='8PM';
        } else if(document.forms[formName].tempRetTime[document.forms[formName].tempRetTime.selectedIndex].value==('ANT')) {
            window.document.forms[formName].returnTime.value='12PM';
        } else {
            window.document.forms[formName].returnTime.value=window.document.forms[formName].tempRetTime.value;
        }
	   }

-->
