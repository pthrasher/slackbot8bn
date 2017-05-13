// @flow
import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

import config from './config';

const BASE_URL = 'https://www.bungie.net/Platform/Destiny';

export
async function makeGETRequest(path: string, params: ?Object) {
  let paramString = '';
  if (params != null) {
    paramString = `?${queryString.stringify(params)}`;
  }

  console.log("issuing bungie API call: %s%s/%s",BASE_URL, path, paramString);

  const response = await fetch(`${BASE_URL}${path}/${paramString}`, {
    credentials: 'include',
    headers: {
      'x-api-key': config.bungieApiToken,
      'Accept': 'application/json',
    }
  });

  console.log("response code", response.status);

  const json = await response.json();

  return json.Response;
}

type MembershipType = '1' | '2';

export
function getPlayerID(
  membershipType: MembershipType,
  displayName: string,
) {
  const path = `/SearchDestinyPlayer/${membershipType}/${displayName}`;
  return makeGETRequest(path);
}

export
function accountSummary(
  membershipType, destinyMembershipId
) {
  const path = `/${membershipType}/Account/${destinyMembershipId}/Summary/`;
  return makeGETRequest(path, { definitions: true });
}
	
