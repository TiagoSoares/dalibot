module.exports = {
  commands: {
    nextGame: 'nextgame',
    table: 'table'
  },
  messages: {
    functions: {
      selectTeamByNameLang: {
        questionLabel: 'Please select one of the following teams within 10 seconds:'
      },
      selectCompetitionByNameLang: {
        questionLabel: 'Please select one of the following competitions within 10 seconds:'
      }
    },
    commands: {
      nextGame: {
        title: teamName => `${teamName}'s Next Game`,
        gameFieldTitle: 'Game',
        gameTeams: (homeTeam, awayTeam) => `${homeTeam} vs ${awayTeam}`,
        competition: 'Competition',
        venue: 'Venue',
        gameDay: 'Game Day',
        homeTeam: 'Home Team',
        awayTeam: 'Away Team',
        gameweek: 'Gameweek',
        footer: (authorUsername, message) => `Executed by ${authorUsername} with: ${message}`,
        error: "I'm sorry but there was an error loading the selected team."
      },
      table: {
        tableHeadings: {
          position: 'P',
          team: 'Team',
          gamePlayed: 'P',
          gamesWon: 'W',
          gamesEven: 'D',
          gamesLost: 'L',
          for: 'GF',
          against: 'GA',
          ratio: 'GD',
          points: 'PTS'
        },
        error: "I'm sorry but there was an error loading the selected competition."

      },
      help: {
        title: botName => `Help Menu For ${botName}`,
        description: botName => `\`Welcome to the ${botName} help menu.\`\n\n\nTo write a command simple type:\n\`>command argument1 argument2\`.\n\nThe following example will give you Ranger next game:\n\`>nextgame Rangers\``,
        nextGameLabel: '>nextgame',
        nextGame: "Look at a team's next game.\nArgument 1 - optional - Team Name (Rangers FC is default team)",
        tableLabel: '>table',
        table: "Look at a competition's table.\nArgument 1 - optional - League Name (Rangers FC is default team)",
      },
    }
  }
}
