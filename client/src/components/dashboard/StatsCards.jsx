import { Database, CheckCircle, XCircle, RotateCcw } from "lucide-react";

export default function StatsCards() {
    const stats = [
      { 
        label: 'Total Migrations', 
        value: 42,
        icon: <Database className="w-5 h-5" />,
        color: 'from-blue-600/20 to-blue-500/5',
        borderColor: 'border-blue-500/20',
        textColor: 'text-blue-400'
      },
      { 
        label: 'Successful', 
        value: 39,
        icon: <CheckCircle className="w-5 h-5" />,
        color: 'from-green-600/20 to-green-500/5',
        borderColor: 'border-green-500/20',
        textColor: 'text-green-400'
      },
      { 
        label: 'Failed', 
        value: 3,
        icon: <XCircle className="w-5 h-5" />,
        color: 'from-red-600/20 to-red-500/5',
        borderColor: 'border-red-500/20',
        textColor: 'text-red-400'
      },
      { 
        label: 'Rollbacks', 
        value: 2,
        icon: <RotateCcw className="w-5 h-5" />,
        color: 'from-amber-600/20 to-amber-500/5',
        borderColor: 'border-amber-500/20',
        textColor: 'text-amber-400'
      },
    ];
  
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx}
            className={`bg-gray-900 bg-gradient-to-br ${stat.color} rounded-2xl p-5 shadow-xl ${stat.borderColor} border backdrop-blur-sm hover:translate-y-[-4px] transition-all duration-300`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-xs font-medium text-gray-400 font-Montserrat uppercase tracking-wide">{stat.label}</h4>
                <p className={`text-2xl font-semibold ${stat.textColor} mt-2 font-Syne`}>{stat.value}</p>
              </div>
              <div className={`${stat.textColor} bg-gray-800/60 rounded-xl p-2.5`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }