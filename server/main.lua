local DAYS = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" }
local MONTHS = { "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" }

local function getFormattedDate()
    local currentDate = os.date("*t")
    local day = DAYS[currentDate.wday]
    local month = MONTHS[currentDate.month]
    return string.format("%s, %s %d", day, month, currentDate.day)
end

RegisterServerEvent('sendData')
AddEventHandler('sendData', function()
    local dateString = getFormattedDate()
    TriggerClientEvent('receiveData', -1, dateString)
end)