(function() {

'use strict';

angular
  .module('app')
  .service('TranslationRepository', TranslationRepository);


function TranslationRepository($http, $q, Configuration) {

  this.get = function(translationId) {
    var deferred = $q.defer();

    $http.get(Configuration.SERVER_BASE_URL + '/translations/' + translationId).success(function(data) {
      deferred.resolve(data);
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  }

  this.savePhrase = function(translationId, locale, phrase) {
    console.log('savePhrase');

    var deferred = $q.defer();

    $http({
      method: 'POST',
      url: Configuration.SERVER_BASE_URL + '/translations/' + translationId + '/phrases/' + locale,
      data: { text: phrase, approved: false }
    }).success(function(data) {
      deferred.resolve(data);
    }, function() {
      deferred.reject();
    });

    return deferred.promise;
  }
}

})();
