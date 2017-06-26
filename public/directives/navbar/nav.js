angular.module("JabberTalkee")

    .controller("navCtrl", ["$scope", "$routeParams", "channelService", function ($scope, $routeParams, channelService) {
        $scope.channelList = [];
        $scope.setChannel = function (channel_id) {
          $scope.channel_id = channel_id;
          // console.log(channel_id)
        };
        $scope.createChannel = function (channel) {
            if (!channel){
                alert("Please provide a channel topic");
                return;
            }
            channelService.createChannel(channel)
                .then(
                    function (response) {
                        return channelService.getRequest()
                    }
                )
                .then(
                    function (response) {
                        $scope.channelList = response;
                        return response
                    }
                );
        };
        channelService.getRequest()
            .then(
                function (response) {
                    $scope.channelList = response;
                    // console.log($scope.channelList);
                    return response
                }
            )
    }])
;