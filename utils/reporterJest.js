class Reporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(contexts, results) {
    if(results.numFailedTestSuites == 0){
      console.log(`
      ++++++++++++++++++++++++oooooooooooo+++++++++++++++++++++++++++++++++++++++++++++++++++//::---.....-----::::://////+++++
      hhhhhhhhhhhhhhhhhhhhhhdddddddddddddddhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhyso++//::::::////++ooosssyyyhhhhd
      hhhhhhhhhhhhhhhhhhhhhhhddddddddddddddhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhysoo+//:::::////+++ooosssyyyyhhhd
      hhhhhhhhhhhhhhhhhdhhhhhhhhhhhhhhddddddhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhyhhsso++/////////+++oooosssyyyyhhhd
      hhhhhhhhhhhhhhhmmmmddhhhhhhhhhhhhhhhddhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhyyhysso+++///+++++oooooossssyyyyhhh
      hhhhhhhhhhhhhhhmmmmmmmdhhyyyyyyyhhhhhhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhyssoo++++++ooooooosssssssyyyhhh
      hhhhhhhhhhhhhhhmNmddmm+:/osyyyyyyyhhhhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhyysssoooooooossssssssssssyyyyhh
      hhhhhhhhhhhhhhdNNmmdmm:----:/osyyyyhhhhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhyyyyyyyysssyssssssssssyyyyyhhh
      hhhhhhhhhhhhhhhdhhmmmm:--------:+syhhhhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddddhhhhhhhhhhhhhhhhhhhhhhhhhym
      hhhhhhhhhhhhhyssssydmm+-----------:/oyhddhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhdddddddddddddddddddddhso+/:-:m
      hhhhhhhhhhhhhsssssssdmy---------------/oyhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddddmdmmmmdmmmddhs+/:-------/m
      hhhhhhhhhhhhsssssssssdm+-----------------/oyhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddddddmmmmddyo/:------------sm
      hhhhhhhhhhhyssssssssyyhd:-------------------/ohhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddddmddhs+/----------------:dm
      hhhhhhhhhhhssssssssyyyydh:--------------------:+yhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddhs+:--------------------omm
      hhhhhhhhhhysssssssyyyyhhdh:----------------------+yhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhyo/:-----------------------/dmm
      hhhhhhhhhyssssssssyyyhhdddh/-----------------------+hhhhhhhhhhhhhyyyyyyyysssyyyyyhhhhso/---------------------------:dmmm
      hhhhhhhhhssssssssyyyhhddddmdo-----------------------:oo++///:::-------------------:/------------------------------:hmmdm
      hhhhhhhhyyysysssyyyhhhddddddmy:----------------------------------------------------------------------------------/dmdddd
      hhhhhhhhhyyyyyyyyyhhhdddddddmmdo--------------------------------------------------------------------------------odhhdddd
      hhhhhhddhhhhhhhhhhdddddddddmmmmmh+----------------------------------------------------------------------------/yhyyyhhhh
      hhhhhhddddddddddddddddddddddmmmmmmh/----:+------------------------------------------------------------------/yyssyyyyyhh
      hhhhhdmmmmmmmmmmmmmmmmmmdddmmmmmmmmmh+/o+---------------------------------------------------------:------:+yysssssyyyyhh
      hhhhdmmmmmmmmmmmmmmmmmmmmmmdmmmmmmmmmmo-----------------------------------------------------------/o+-:+yhyysssssyyyyhhh
      hhhhmmmmmmmmmmmmmmmmmmmmmmddddmmmmmmmo--------------------------------------------------------------/ydhhyyyyyyyyyyyyhhh
      hhhdmmmmmNNNNNNNNNmmmmmmmmdddddmmmmms----------------------------------------------------------------:ydhhhyyyyyyyyhhhhh
      hhhmmmmNNNNNNNNNNNNNmmmmmmddddddddmh-----------+oshhs:---------------------------/osydy/--------------:ydhhhhhhhhhhhhhdd
      hhmmmmNNNNNNNNNNNNNNNmmmmmmdmdddddd/----------oo''-dmd:-------------------------/y.''ymm+--------------:ddhhhhhhhhhhhddd
      hdmmmmNNNNNNNNNNNNNNNmmmmmmdddddddo-----------hh+/sdmmo-------------------------odo/oddmy---------------+ddddddddddddddd
      hmmmmNNNNNNNNNNNNNNNNNmmmmmddddddy------------omddddmd:-------------------------/ddddddd+----------------hdddddddddddddd
      dmmmNNNNNNNNNNNNNNNNNmmmmmmdddddd/-------------+yhhhs:---------------------------:shhhy/-----------------/mddddddddddddd
      mmmmNNNNNNNNNNNNNNNNNNmmmmmddddds----------------::-----------:///:-----------------::--------------------ymdddddddddddd
      mmmmNNNNNNNNNNNNNNNNNNmmmmdddddd:----------------------------:ydddh/--------------------------------------:mdddddddddddd
      mmmmmNNNNNNNNNNNNNNNmmmmmmdddddy--:/+ooo+/:-------------------:://:-----------------------:/+ooo++:--------smddddddddddd
      mmmmmmmmNNNNNNNNNNmmmmmmddddddd/-+sssssssss+--------------------------------------------:ossssssssso/------:dddddddddddd
      mmmmmmmmmmmmmmmmmmmmddddddhhhhd-/sssssssssss+-------------------------------------------ossssssssssss:------odhhhhdddddd
      ddddddddddddddddddddddhhhhhhhhh-/sssssssssss/----------------:+ooooooooo/---------------sssssssssssss:------:dhhhhhhhhdd
      ddddddddddhhhhhhhhhhhhhhhyyyyyh--/ossssssso/----------------os+////////+so--------------/ossssssssss/--------shyhhhhhhhd
      dddhhhhhhhhhyyyyyyyyyyyyyyyyyyd:---::///::-----------------:h////////////h:--------------:/+oooooo/:---------:dyyyyyhhhh
      ddhhhhhyyyyyyyyyyyyyyyysssssssys----------------------------yo///////////y/------------------:::--------------syyyyyyhhh
      ddhhhyyyyyssssssssssssssssssssyh+---------------------------:so+////////+y:-----------------------------------/hsssyyyhh
      ddhhhyyyyssssssssssssssssssssssyh/----------------------------/oooooooooo:-------------------------------------yyyyyyyyy
      ddhhhyyyyyssssssssssssssssssssyyyh/------------------------------::::::----------------------------------------:hyyyyyyy
      hyyyyysssssssoooooooooooooooossssyy:----------------------------------------------------------------------------yyysssss
`)
    }
  }
}

module.exports = Reporter;