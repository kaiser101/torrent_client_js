const getOpts = () => {
    return {
        tracker: {
            announce: [
                'udp://tracker.opentrackr.org:1337/announce',
                'https://tracker2.ctix.cn:443/announce',
                'https://tracker1.520.jp:443/announce',
                'http://tracker.opentrackr.org:1337/announce',
                'udp://opentracker.i2p.rocks:6969/announce',
                'udp://open.demonii.com:1337/announce',
                'udp://tracker.openbittorrent.com:6969/announce',
                'http://tracker.openbittorrent.com:80/announce',
                'udp://open.stealth.si:80/announce',
                'udp://exodus.desync.com:6969/announce',
                'udp://tracker.torrent.eu.org:451/announce',
                'udp://explodie.org:6969/announce',
                'udp://tracker1.bt.moack.co.kr:80/announce',
                'udp://tracker.tiny-vps.com:6969/announce',
                'udp://tracker.theoks.net:6969/announce',
                'udp://tracker-udp.gbitt.info:80/announce',
                'udp://isk.richardsw.club:6969/announce',
                'https://tracker.gbitt.info:443/announce',
                'http://tracker1.bt.moack.co.kr:80/announce',
                'http://tracker.ipv6tracker.org:80/announce',
                'http://tracker.gbitt.info:80/announce',
                'udp://uploads.gamecoast.net:6969/announce',
                'udp://tracker.filemail.com:6969/announce',
                'udp://tracker.4.babico.name.tr:3131/announce',
                'udp://sanincode.com:6969/announce',
                'udp://retracker01-msk-virt.corbina.net:80/announce',
                'udp://open.dstud.io:6969/announce',
                'udp://movies.zsw.ca:6969/announce',
                'udp://epider.me:6969/announce',
                'udp://bt.ktrackers.com:6666/announce',
                'udp://acxx.de:6969/announce',
                'udp://aarsen.me:6969/announce',
                'https://tracker.tamersunion.org:443/announce',
                'https://tracker.renfei.net:443/announce',
                'https://tracker.imgoingto.icu:443/announce',
                'https://tr.burnabyhighstar.com:443/announce',
                'http://tracker.renfei.net:8080/announce',
                'http://tracker.dler.org:6969/announce',
                'http://open.acgnxtracker.com:80/announce',
                'udp://x.t-1.org:6969/announce',
                'udp://x.paranoid.agency:6969/announce',
                'udp://wepzone.net:6969/announce',
                'udp://v2.iperson.xyz:6969/announce',
                'udp://tracker2.dler.org:80/announce',
                'udp://tracker1.myporn.club:9337/announce',
                'udp://tracker.therarbg.com:6969/announce',
                'udp://tracker.t-rb.org:6969/announce',
                'udp://tracker.skynetcloud.site:6969/announce',
                'udp://tracker.qu.ax:6969/announce',
                'udp://tracker.publictracker.xyz:6969/announce',
                'udp://tracker.dump.cl:6969/announce',
                'udp://tracker.dler.org:6969/announce',
                'udp://tracker.cubonegro.lol:6969/announce',
                'udp://tracker.ccp.ovh:6969/announce',
                'udp://tracker.0x7c0.com:6969/announce',
                'udp://thouvenin.cloud:6969/announce',
                'udp://thinking.duckdns.org:6969/announce',
                'udp://su-data.com:6969/announce',
                'udp://ryjer.com:6969/announce',
                'udp://run.publictracker.xyz:6969/announce',
                'udp://public.tracker.vraphim.com:6969/announce',
                'udp://private.anonseed.com:6969/announce',
                'udp://opentracker.io:6969/announce',
                'udp://open.u-p.pw:6969/announce',
                'udp://open.free-tracker.ga:6969/announce',
                'udp://oh.fuuuuuck.com:6969/announce',
                'udp://new-line.net:6969/announce',
                'udp://moonburrow.club:6969/announce',
                'udp://free.publictracker.xyz:6969/announce',
                'udp://evan.im:6969/announce',
                'udp://carr.codes:6969/announce',
                'udp://bt2.archive.org:6969/announce',
                'udp://bt1.archive.org:6969/announce',
                'udp://6.pocketnet.app:6969/announce',
                'https://www.peckservers.com:9443/announce',
                'https://tracker.loligirl.cn:443/announce',
                'https://tracker.lilithraws.org:443/announce',
                'https://tracker.cloudit.top:443/announce',
                'https://t1.hloli.org:443/announce',
                'https://1337.abcvg.info:443/announce',
                'http://www.peckservers.com:9000/announce',
                'http://wg.mortis.me:6969/announce',
                'http://wepzone.net:6969/announce',
                'http://tracker2.dler.org:80/announce',
                'http://tracker.qu.ax:6969/announce',
                'http://tracker.mywaifu.best:6969/announce',
                'http://tracker.files.fm:6969/announce',
                'http://tracker.edkj.club:6969/announce',
                'http://tracker.bt4g.com:2095/announce',
                'http://incine.ru:6969/announce',
                'http://ch3oh.ru:6969/announce',
                'http://1337.abcvg.info:80/announce',
                'udp://ts.populargamers.co.za:6969/announce',
                'udp://tracker.srv00.com:6969/announce',
                'udp://tracker.farted.net:6969/announce',
                'udp://tracker.artixlinux.org:6969/announce',
                'udp://torrents.artixlinux.org:6969/announce',
                'udp://tamas3.ynh.fr:6969/announce',
                'udp://mail.artixlinux.org:6969/announce',
                'udp://hz.is:1337/announce',
                'udp://fh2.cmp-gaming.com:6969/announce',
                'udp://concen.org:6969/announce',
                'udp://bittorrent-tracker.e-n-c-r-y-p-t.net:1337/announce',
                'udp://aegir.sexy:6969/announce',
                'udp://1c.premierzal.ru:6969/announce',
                'https://tracker.netmap.top:8443/announce',
                'http://tracker1.itzmx.com:8080/announce',
                'http://t.acg.rip:6699/announce',
                'http://bittorrent-tracker.e-n-c-r-y-p-t.net:1337/announce',
            ],
        },
    };
};
export default getOpts;
