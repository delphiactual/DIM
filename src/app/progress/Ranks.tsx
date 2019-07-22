import React from 'react';
import { DestinyProfileResponse } from 'bungie-api-ts/destiny2';
import { CrucibleRank } from './CrucibleRank';
import { D2ManifestDefinitions } from 'app/destiny2/d2-definitions.service';

/**
 * displays all Crucible and Gambit ranks for the account
 */
export default function Ranks({
  profileInfo,
  defs
}: {
  profileInfo: DestinyProfileResponse;
  defs: D2ManifestDefinitions;
}) {
  const firstCharacterProgression = profileInfo.characterProgressions.data
    ? Object.values(profileInfo.characterProgressions.data)[0].progressions
    : {};
  const activityRanks = [
    {
      // Valor
      progressionInfo: firstCharacterProgression[2626549951],
      resetInfo: firstCharacterProgression[2679551909] // swapped with glory (Bungie-net/api#986)
    },
    {
      // Glory
      progressionInfo: firstCharacterProgression[2000925172],
      resetInfo: firstCharacterProgression[3882308435] // swapped with valor (Bungie-net/api#986)
    },
    {
      // Infamy
      progressionInfo: firstCharacterProgression[2772425241],
      resetInfo: firstCharacterProgression[2772425241]
    }
  ];

  return (
    <div className="progress-for-character ranks-for-character">
      {activityRanks.map(
        (activityRank) =>
          activityRank.progressionInfo &&
          activityRank.resetInfo && (
            <CrucibleRank
              key={activityRank.progressionInfo.progressionHash}
              defs={defs}
              progress={activityRank.progressionInfo}
              resets={activityRank.resetInfo}
            />
          )
      )}
    </div>
  );
}
