local QBCore = exports['qb-core']:GetCoreObject()

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

lib.callback.register('devx_spawn:server:getProperty', function(source)
    local player = QBCore.Functions.GetPlayer(source)
    local houseData = {}
    local playerHouses = {}

    if Config.Property == "qb-housing" then
        playerHouses = MySQL.query.await('SELECT house FROM player_houses WHERE citizenid = ?', { player.PlayerData.citizenid })
    elseif Config.Property == "ps-housing" then
        playerHouses = MySQL.query.await('SELECT * FROM properties WHERE owner_citizenid = ?', { player.PlayerData.citizenid })
    end
    for i = 1, #playerHouses do
        local name = playerHouses[i].house
        local locationData = MySQL.single.await('SELECT `coords`, `label` FROM houselocations WHERE name = ?', {name})
        if locationData then
            houseData[#houseData+1] = {
                label = locationData.label,
                coords = json.decode(locationData.coords).enter
            }
        end
    end

    return houseData
end)