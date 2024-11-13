local function getFormattedDate()
    local currentDate = os.date("*t")
    local days = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}
    local months = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"}
    local day = days[currentDate.wday]
    local month = months[currentDate.month]
    return string.format("%s, %s %d", day, month, currentDate.day)
end

RegisterServerEvent('sendData')
AddEventHandler('sendData', function()
    local dateString = getFormattedDate()
    TriggerClientEvent('receiveData', -1, dateString)
end)