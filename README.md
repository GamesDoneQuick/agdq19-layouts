# agdq19-layouts [![Build status](https://ci.appveyor.com/api/projects/status/hbvvtm7vnqwil964/branch/master?svg=true)](https://ci.appveyor.com/project/supportclass/agdq19-layouts/branch/master)

> The on-stream graphics used during Awesome Games Done Quick 2019.

This is a [NodeCG](http://github.com/nodecg/nodecg) v1 bundle. You will need to have NodeCG v1 installed to run it.

## Table of Contents
- [Video Breakdown](#video-breakdown)
- [Automated Builds](#automated-builds)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Setting up OBS](#setting-up-obs)
  - [Tweets and Fan art](#tweets-and-fan-art)
  - [Tracker Credentials](#tracker-credentials)
- [Usage](#usage)
  - [Running a mock donation server](#running-a-mock-donation-server)
  - [Lightning Round](#lightning-round)
- [Interviews](#interviews)
- [License](#license)
- [Credits](#credits)

## Video Breakdown
We unfortunately do not have time to make a video breakdown for this event's bundle. However, [we did make one for AGDQ 2017's graphics package](https://www.youtube.com/watch?v=vBAZXchbI3U&list=PLTEhlYdONYxv1wk2FsIpEz92X3x2E7bSx), which still has a few similarities with this one.

## Automated Builds
If you are using an automated build (which includes everything in one zip file with a single exe), skip to [configuration](#configuration).

Automated builds are made on AppVeyor CI. You can view the list of builds [here](https://ci.appveyor.com/project/supportclass/agdq19-layouts/history). To download a build, click the "Artifacts" link in the top right, above that build's log output. Then, download the `sdgq18-layouts-${HASH}.zip` for that build.

If you just want a direct link to a build that works and don't mind it maybe being slightly out-of-date, [here you go](https://ci.appveyor.com/api/buildjobs/og2qald1coyvuvxm/artifacts/agdq19-layouts-329275fa.zip).

## Requirements
- [Node.js 8 or greater (8 recommended, newer versions not tested)](https://nodejs.org/)
- [NodeCG v1.x](https://github.com/nodecg/nodecg/releases)

## Installation

> 💡 Skip this section if you are using an automated build

1. Clone (or download & extract) to `nodecg/bundles/agdq19-layouts`.
2. Install `bower` if you have not already (`npm install -g bower`)
3. `cd nodecg/bundles/agdq19-layouts` and run `npm install --production`, then `bower install`
4. Create the configuration file (see the [configuration](#configuration) section below for more details)
	- This is optional, but a lot of functionality requires it. Many systems will be unavailable unless you configure them.
5. Run the nodecg server: `node index.js` (or `nodecg start` if you have [`nodecg-cli`](https://github.com/nodecg/nodecg-cli) installed) from the `nodecg` root directory.

**Please note that by default, not all graphics will work.** This is because `agdq19-layouts` makes use of several non-free plugins for [GSAP](https://greensock.com), which we cannot redistribute. If you wish to use all graphics in their current implementations, you will need to pay for access to [Club GreenSock](https://greensock.com/club) and save the following plugins to the following directories:
- [SplitText](https://greensock.com/SplitText): `shared/lib/vendor/SplitText.min.js`
- [CustomEase](https://greensock.com/customease): `shared/lib/vendor/CustomEase.min.js`
- [DrawSVGPlugin](https://greensock.com/drawSVG): `shared/lib/vendor/DrawSVGPlugin.min.js`

## Configuration
To configure this bundle, create and edit `nodecg/cfg/agdq19-layouts.json`.  
Refer to [configschema.json](configschema.json) for the structure of this file.

If you have [nodecg-cli](https://github.com/nodecg/nodecg-cli) installed, you can run `nodecg defaultconfig` from the `nodecg/bundles/agdq19-layouts/` folder to generate a `nodecg/cfg/agdq19-layouts.json` file with default values derived from the schema.

### Setting up OBS
`agdq19-layouts` has a deep, complex integration with OBS Studio. As such, it expects your OBS to be fairly precisely configured.

1. Download and extract [this custom build of OBS](https://www.dropbox.com/s/l6cfzjgdytvdfx7/AGDQ-2019-OBS-1.zip?dl=1), which includes all the plugins we use.  
   	- Once extracted, OBS can be launched via `bin/64bit/obs64.exe`.
	- The source code for this build can be viewed [here](https://github.com/GamesDoneQuick/obs-studio/tree/agdq2019).
2. Go to "Profile > Import", and import the `obs-assets/obs-profile` directory from this repository. Then, ensure that the "AGDQ 2019" profile is selected in OBS.  
3. Go to "Scene Collection > Import", and import the `obs-assets/obs-scenes.json` file from this repository. Then, ensure that the "AGDQ2019 - Localhost" scene collection is selected in OBS.  
4. Locate the "Scene Transitions" dropdown menu in the main interface of OBS (it will be near the bottom right by default). Select "Blank Stinger". Click the gear icon below the dropdown, and select "Properties". Update the "Video File" path to point to your `agdq19-layouts/obs-assets/BlankTransition.mov` path.
5. Ensure OBS is in Studio Mode.
6. Click the gear icon to the right of the center "Transition" button.
7. Ensure that "Duplicate Scene" is unchecked.

You may notice that we use a custom plugin called GDQ Crop. This plugin's source can be viewed [here](https://github.com/TestRunnerSRL/gdqcrop).

### Tweets and Fan art
> ❗ This does not cover the system for interview question tweets, which is a separate system called [_Lightning Round_](#lightning-round). This only covers the system for showing Tweets and Fan art on the break and gameplay scenes.

To show Tweets and Fan art on the break and gameplay scenes, you will need to define the `twitter` object in your `nodecg/cfg/agdq19-layouts.json` config file.

This system has changed. Previously, you'd enter your Twitter API credentials directly into your config, and `agdq19-layouts` would handle making all the API requests for you. This is no longer possible, due to Twitter's new API structure.

To resolve this issue, we had to create a small microservice running on Heroku which acts as a middleman between Twitter and the local deployment of `agdq19-layouts`. This microservice is called [`twitter-socket.io-adapter`](https://github.com/GamesDoneQuick/twitter-socket.io-adapter), and its documentation can be viewed [here](https://github.com/GamesDoneQuick/twitter-socket.io-adapter/blob/master/README.md).

Once you have a deployment of `twitter-socket.io-adapter` up and running on Heroku, you can configure your `twitter` object in `nodecg/cfg/agdq19-layouts.json` like this example:

```json
{
	"twitter": {
		"enabled": true,
		"websocketUrl": "https://YOUR_HEROKU_APP_NAME.herokuapp.com/",
		"preSharedKey": "YOUR_SECRET_KEY_FROM_YOUR_DEPLOYMENT_ON_HEROKU",
		"debug": false
	}
}
```

### Tracker Credentials
Some of the data that `agdq19-layouts` fetches from the tracker is private, privileged data. An authorized account is required to access this data. Private data includes:
- Ad schedule
- Interview schedule
- Per-run tech notes

If you wish to access private data on your deployment of the tracker, you'll need to configure your `tracker` object in `nodecg/cfg/agdq19-layouts.json` like this example:
```json
{
	"tracker": {
		"username": "YOUR_USERNAME",
		"password": "YOUR_PASSWORD",
		"eventId": 23
	}
}
```

## Usage
This bundle is not intended to be used verbatim. Some of the assets have been replaced with placeholders, and most of the data sources are hardcoded. We are open-sourcing this bundle in hopes that people will use it as a learning tool and base to build from, rather than just taking and using it wholesale in their own productions.

To reiterate, please don't just download and use this bundle as-is. Build something new from it.

1. Start NodeCG
	```bash
	# From the `nodecg` dir:
	node index.js
	```
	- If you're using an automated build, just run `nodecg.exe`.
2. Open [http://localhost:9090](http://localhost:9090)
3. Click on the "Setup" tab of the dashboard, and connect to OBS using the "OBS" panel.
	- By default, `obs-websocket` uses port 4444 and has no password.
	- The `compositingOBS` tab is for the "compositor" OBS, where the graphics are running.
	- The `recordingOBS` tab is for the "recording" OBS, where the primary recordings are running.
		- You do not need to have `recordingOBS` connected, it is optional.
	- The `encodingOBS` tab is for the "encoding" OBS, where the secondary recordings are running.
		- You do not need to have `encodingOBS` connected, it is optional.
		
### Running a mock donation server
`agdq19-layouts` listens for donations in realtime, rather than polling the donation tracker for a new donation total. To facilitate testing,
we provide a small script that sends mock donations:

1. Add `"donationSocketUrl": "http://localhost:22341"` to your `nodecg/cfg/agdq19-layouts.json`
2. From the `nodecg/bundles/agdq19-layouts` folder, run `npm run mock-donations`
3. Run NodeCG (`nodecg start` or `node index.js` from the `nodecg` folder)

In production, you'd use [TipoftheHats/donation-socket-repeater](https://github.com/TipoftheHats/donation-socket-repeater) along with the "Postback URL" feature of [GamesDoneQuick/donation-tracker](https://github.com/GamesDoneQuick/donation-tracker).

### Lightning Round
[Lightning Round](https://github.com/GamesDoneQuick/lightning-round) is GDQ's system for gathering interview questions from Twitter. It exists in two parts: one part running "in the cloud" as a Firebase app, and one part running locally as part of this NodeCG bundle.

Lightning Round is pretty weird and kind of difficult to set up. You can watch these videos for more information but please bear in mind that they are outdated, as they were made for AGDQ 2017, not AGDQ 2019:
- [Lightning Round Overview](https://www.youtube.com/watch?v=-qzIfS7KxCQ&index=4&list=PLTEhlYdONYxv1wk2FsIpEz92X3x2E7bSx)
- [Lightning Round Setup Guide](https://www.youtube.com/watch?v=Uz_99-bJzyc&index=12&list=PLTEhlYdONYxv1wk2FsIpEz92X3x2E7bSx)

		
## Interviews
Interviews at GDQ events are pre-composited on a [Blackmagic ATEM 2 M/E Production Studio 4K](https://www.blackmagicdesign.com/products/atem). The final program out from this ATEM is then sent into OBS as a single SDI capture input. Interviews are run by a separate team from the rest of the stream, so that setup can continue uninterrupted while the interview is ongoing.

Our ATEM operators sometimes use [`atem-compositor`](https://github.com/TipoftheHats/atem-compositor) to help them more rapidly create compositions of multiple sources on an ATEM, which is notoriously difficult to do quickly and accurately without the use of programs such as [`atem-compositor`](https://github.com/TipoftheHats/atem-compositor). 

## License
agdq19-layouts is provided under the Apache v2 license, which is available to read in the [LICENSE](LICENSE) file.

## Credits
Designed & developed by [Support Class](https://supportclass.net/):
 - [Alex "Lange" Van Camp](https://twitter.com/VanCamp/)  
 - [Chris Hanel](https://twitter.com/ChrisHanel)

Additional help from:
 - [Keiichiro "Hoishin" Amemiya](https://github.com/Hoishin)
