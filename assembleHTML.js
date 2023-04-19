const template = require('./template')

function assembleHTML(weathetDataObject){
    htmlData = template
    const tr_template = `
    <td class="date"><div>Day [DAY_NUMBER]</div><div>[DATE_PLACEHOLDER]</div></td>
        <td>
          <div class="weather-card">
            <div class="container" style="border-right: 1px solid #35495e">
              <div class="description content-box">
                <img class="icon" [STYLE_PLACEHOLDER] src="https://weatherapplj.blob.core.windows.net/weather-icons/[WEATHER_ICON].png"/>
                <div class="label">[WEATHER_ICON_LABEL]</div>
              </div>
            </div>
            <div class="container" style="border-right: 1px solid #35495e">
              <div class="content-box">
                <div class="temperature">
                  <span class="number">[TEMP_MIN_INT]</span>
                  &#8451;
                </div>
                <div class="label">Min</div>
              </div>
              <div class="content-box">
                <div class="temperature">
                  <span class="number">[TEMP_MAX_INT]</span>
                  &#8451;
                </div>
                <div class="label">Max</div>
              </div>
            </div>
            <div class="container" style="border-right: 1px solid #35495e">
              <div class="content-box">
                <div><span class="number">[WIND_MOVEMENT_SPEED] </span>km/h</div>
                <div class="label">Wind</div>
              </div>
            </div>
            <div class="container weather_container">
              <div class="content-box">
                <div class="number">[RAIN_CHANCE_PERCENT]%</div>
                <div class="label">Rain</div>
              </div>
            </div>
          </div>
        </td>
    `;

    weather_card_template = `[MAX_TEMP] / [MIN_TEMP]  [SHORT_DESCRIPTION] `

    var dynamic_table = '<tr>\n';
    var dayCounter = 0

    function buildCard(this_dayCounter,this_val,this_tr_template,prependDate){ 
        if (prependDate){
          this_tr_template = this_tr_template.replace('[DAY_NUMBER]',this_dayCounter.toString())
          let this_date = this_val['date'].split('T')[0]
          this_tr_template = this_tr_template.replace('[DATE_PLACEHOLDER]',this_date)
        }
        else {
          this_tr_template = this_tr_template.replace('<td class="date"><div>Day [DAY_NUMBER]</div><div>[DATE_PLACEHOLDER]</div></td>','')
        }
        let iconCodes = {
          1:'sun',
          3:'partlySunny',
          7:'cloud',
          18:'rain',
          17:'sunnyThunderstorm',
          4:'partlySunny',
          15:'thunderstorm',
          6:'cloud',
          12:'shower',
          8:'cloud',
          2:'sun',
          14:'sunnyWithShowers'
        } 
        const iconCode = this_val['day']['iconCode']
        const iconLabel = iconCodes[iconCode]
        if (!iconLabel){
          this_tr_template = this_tr_template.replace('[STYLE_PLACEHOLDER]','style="display:none"')
        }else {
          this_tr_template = this_tr_template.replace('[STYLE_PLACEHOLDER]','')
        }
        this_tr_template = this_tr_template.replace('[WEATHER_ICON]',iconCodes[iconCode])
        this_tr_template = this_tr_template.replace('[WEATHER_ICON_LABEL]',this_val['day']['iconPhrase'])
        this_tr_template = this_tr_template.replace('[TEMP_MIN_INT]', Math.round(this_val['temperature']['minimum']['value']))
        this_tr_template = this_tr_template.replace('[TEMP_MAX_INT]', Math.round(this_val['temperature']['maximum']['value']))
        this_tr_template = this_tr_template.replace('[WIND_MOVEMENT_SPEED]',Math.round(this_val['day']['wind']['speed']['value']))
        this_tr_template = this_tr_template.replace('[RAIN_CHANCE_PERCENT]',this_val['day']['precipitationProbability'])
        
        return this_tr_template
    }

    for (let index = 0; index < weathetDataObject['Berlin'].length-1; index++) {
      thisValBerlin = weathetDataObject['Berlin'][index]
      thisValJakarta = weathetDataObject['Jakarta'][index]
      dayCounter += 1
      dynamic_table += '<tr>\n' + buildCard(dayCounter,thisValBerlin,tr_template,true) + buildCard(dayCounter,thisValJakarta,tr_template,false) + '\n</tr>'

    }

    htmlData = htmlData.replace('[TABLE_DATA_PLACEHOLDER]',dynamic_table);
    return htmlData
}

module.exports = assembleHTML