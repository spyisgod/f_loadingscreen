local loadingScreenFinished = false

AddEventHandler('playerSpawned', function()
    if not loadingScreenFinished then
        loadingScreenFinished = true
        ShutdownLoadingScreenNui()
    end
end)

-- Citizen.CreateThread(function()
--     local loadingProgress = 0
--     while not loadingScreenFinished do
--         local players = #GetActivePlayers()
--         if players > 0 then
--             loadingProgress = loadingProgress + 1
--         end
--         SendNUIMessage({
--             eventName = 'loadProgress',
--             loadFraction = math.min(loadingProgress / 100, 1.0)
--         })

--         if loadingProgress >= 100 then
--             loadingScreenFinished = true
--             ShutdownLoadingScreenNui()
--         end

--         Citizen.Wait(50)
--     end
-- end)