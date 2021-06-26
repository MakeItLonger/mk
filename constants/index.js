// export const HIT = {
//     head: 30,
//     body: 25,
//     foot: 20,
// };

// export const ATTACK = ['head', 'body', 'foot'];

export const LOGS = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

export const ARENAS = [
    'assets/arenas/1.png',
    'assets/arenas/2.gif',
    'assets/arenas/3.gif',
    'assets/arenas/4.gif',
    'assets/arenas/5.gif',
    'assets/arenas/6.gif',
];

export const POSES = [
    'patient number 0',
    /* 1 */{victoryPose: 'assets/victory_poses/rain.gif', defeatPose: 'assets/victory_poses/rain_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '110%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 2 */{victoryPose: 'assets/victory_poses/reptile.gif', defeatPose: 'assets/victory_poses/reptile_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '110%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 3 */{victoryPose: 'assets/victory_poses/stryker.gif', defeatPose: 'assets/victory_poses/stryker_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '100%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 4 */{victoryPose: 'assets/victory_poses/jax.gif', defeatPose: 'assets/victory_poses/jax_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '110%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 5 */{victoryPose: 'assets/victory_poses/nightwolf.gif', defeatPose: 'assets/victory_poses/nightwolf_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '140%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /*  */{victoryPose: 'assets/victory_poses/jade.gif', defeatPose: 'assets/victory_poses/jade_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '125%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 7 */{victoryPose: 'assets/victory_poses/noobsaibot.gif', defeatPose: 'assets/victory_poses/noobsaibot_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '118%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 8 */{victoryPose: 'assets/victory_poses/sonya.gif', defeatPose: 'assets/victory_poses/sonya_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '100%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 9 */{victoryPose: 'assets/victory_poses/kano.gif', defeatPose: 'assets/victory_poses/kano_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '105%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 10 */{victoryPose: 'assets/victory_poses/milena.gif', defeatPose: 'assets/victory_poses/milena_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '140%', scaleDefeatWidth: '100%', scaleDefeatHeight: '118%'},
    'skip',
    /* 12 */{victoryPose: 'assets/victory_poses/subzero2.gif', defeatPose: 'assets/victory_poses/subzero2_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '130%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 13 */{victoryPose: 'assets/victory_poses/subzero.gif', defeatPose: 'assets/victory_poses/subzero_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '100%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 14 */{victoryPose: 'assets/victory_poses/kunglao.gif', defeatPose: 'assets/victory_poses/kunglao_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '107%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 15 */{victoryPose: 'assets/victory_poses/sector.gif', defeatPose: 'assets/victory_poses/sector_d.gif', scaleVictoryWidth: '80%', scaleVictoryHeight: '90%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 16 */{victoryPose: 'assets/victory_poses/kitana.gif', defeatPose: 'assets/victory_poses/kitana_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '130%', scaleDefeatWidth: '100%', scaleDefeatHeight: '118%'},
    /* 17 */{victoryPose: 'assets/victory_poses/ermac.gif', defeatPose: 'assets/victory_poses/ermac_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '100%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 18 */{victoryPose: 'assets/victory_poses/scorpion.gif', defeatPose: 'assets/victory_poses/scorpion_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '130%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 19 */{victoryPose: 'assets/victory_poses/cyrax.gif', defeatPose: 'assets/victory_poses/cyrax_d.gif', scaleVictoryWidth: '80%', scaleVictoryHeight: '90%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 20 */{victoryPose: 'assets/victory_poses/kabal.gif', defeatPose: 'assets/victory_poses/kabal_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '110%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 21 */{victoryPose: 'assets/victory_poses/sindel.gif', defeatPose: 'assets/victory_poses/sindel_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '100%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 22 */{victoryPose: 'assets/victory_poses/smoke.gif', defeatPose: 'assets/victory_poses/smoke_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '100%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 23 */{victoryPose: 'assets/victory_poses/kang.gif', defeatPose: 'assets/victory_poses/kang_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '100%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
    /* 24 */{victoryPose: 'assets/victory_poses/shang3.gif', defeatPose: 'assets/victory_poses/shang_d.gif', scaleVictoryWidth: '', scaleVictoryHeight: '100%', scaleDefeatWidth: '100%', scaleDefeatHeight: '100%'},
];

