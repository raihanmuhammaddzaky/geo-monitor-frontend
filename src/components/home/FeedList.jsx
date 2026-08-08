import React from 'react';
import LocationCard from './LocationCard';

const mockData = [
    {
        id: 1,
        type: 'Infrastructure',
        colorClass: 'bg-blue-100 text-blue-800',
        time: '10:24 AM',
        title: 'Water Main Break on 5th Ave',
        location: 'Jakarta Selatan, Tebet',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwHi_qjUg78vdyMvv_CpF1miJtbTKBA8X5AxgEIOqGYxLoC_wU0JQA8WfnbliytJXvpWvka5FzusnpQhoCr6_I-m4H8xMeynPl4ckk5beMaMEx-aQBGvRPclCbJnU5aHXhuDex4smIQEyzYkDwQVMuJo2A4BdATXpuuZ-xdgxIe-aAArhUbR2ZTlFQ6kqCJPTeUhKVC4Ao8b3OaiWrx90TE5EDvJ8BTbsqWo-U00RmnY_paxr5FouL-A'
    },
    {
        id: 2,
        type: 'Disaster',
        colorClass: 'bg-red-100 text-red-800',
        time: '09:15 AM',
        title: 'Fallen Tree Blocking Major Road',
        location: 'Bandung, Dago',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHc2QVy3IyMp87ybgtev8SqFkCqzqYiPwJyLLWYhCMW03P1BT2lAieGpSGlVFbz7mK81qwYFJ-FJ0VTyhmrTmsf__VZqM7kLsSK2YHyN02kfFC-fyQYT3wN7sxLFcazWjgx8lf7P7m-0xg7dj14F6oIAd-_vs84cOqPQDlxI7_H21nyiWxKmQr6TWCpLaraZL-i0gyLmjMpQ9iktiaFMs5UsbS9yLx6GLoSif-3lHtTe8b4oXOlztZwQ'
    },
    {
        id: 3,
        type: 'Utility',
        colorClass: 'bg-yellow-100 text-yellow-800',
        time: '08:45 AM',
        title: 'Power Outage - Sector 4 Grid',
        location: 'Surabaya, Gubeng',
        icon: 'bolt'
    }
];

export default function FeedList() {
    return (
        <div className="flex-1 overflow-y-auto bg-white flex flex-col">
            {mockData.map(item => (
                <LocationCard key={item.id} item={item} />
            ))}
        </div>
    );
}
