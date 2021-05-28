import { TwitterTimelineEmbed } from 'react-twitter-embed';

const Day = () => {
  return (
    <div className="news">
      <div className="grid-container">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="BreakingNews"
          theme="dark"
          options={{ height: 400, width: 300 }}
        />
      </div>

      <div className="grid-container">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="espn"
          theme="dark"
          options={{ height: 400, width: 300 }}
        />
      </div>
    </div>
  );
};

export default Day;
